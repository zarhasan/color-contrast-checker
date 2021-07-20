import React, { useContext } from "react";
import tinycolor from "tinycolor2";
import { MdSwapHoriz, MdShare, MdContentCopy } from "react-icons/md";
import { AppContext } from "../store";
import Input from "./Input";
import DemoContent from "./DemoContent";
import { useCopyToClipboard } from "react-use";

const InputBackground = () => {
  const {
    backgroundColor,
    setBackgroundColorPicker,
    setBackgroundColor,
    backgroundColorInput,
    backgroundColorPicker,
    backgroundColorFormat,
    setBackgroundColorFormat,
  } = useContext(AppContext);

  return (
    <Input
      color={backgroundColor}
      setColorPicker={setBackgroundColorPicker}
      setColor={setBackgroundColor}
      inputColor={backgroundColorInput}
      colorPicker={backgroundColorPicker}
      colorFormat={backgroundColorFormat}
      setColorFormat={setBackgroundColorFormat}
      id={"backgroundColor"}
      title={"Background Color"}
    />
  );
};

const InputForeground = () => {
  const {
    foregroundColor,
    setForegroundColorPicker,
    setForegroundColor,
    foregroundColorPicker,
    foregroundColorInput,
    foregroundColorFormat,
    setForegroundColorFormat,
  } = useContext(AppContext);

  return (
    <Input
      color={foregroundColor}
      setColor={setForegroundColor}
      inputColor={foregroundColorInput}
      colorPicker={foregroundColorPicker}
      setColorPicker={setForegroundColorPicker}
      colorFormat={foregroundColorFormat}
      setColorFormat={setForegroundColorFormat}
      id={"foregroundColor"}
      title={"Foreground Color"}
    />
  );
};

const SwapButton = () => {
  const {
    backgroundColorInput,
    foregroundColorInput,
    setBackgroundColor,
    setForegroundColor,
    backgroundColorPicker,
    foregroundColorPicker,
    setBackgroundColorPicker,
    setForegroundColorPicker,
    backgroundColorFormat,
    setBackgroundColorFormat,
    foregroundColorFormat,
    setForegroundColorFormat,
  } = useContext(AppContext);

  return (
    <button
      className="form__swap"
      onClick={(e) => {
        const backgroundColor = tinycolor(backgroundColorInput.current.value);
        const foregroundColor = tinycolor(foregroundColorInput.current.value);

        const backgroundPicker = backgroundColorPicker;
        const foregroundPicker = foregroundColorPicker;

        const backgroundFormat = foregroundColorFormat;
        const foregroundFormat = backgroundColorFormat;

        if (foregroundColor.isValid()) {
          setBackgroundColor(foregroundColor);
          setBackgroundColorPicker(foregroundPicker);
          setForegroundColorFormat(foregroundFormat);
        }

        if (backgroundColor.isValid()) {
          setForegroundColor(backgroundColor);
          setForegroundColorPicker(backgroundPicker);
          setBackgroundColorFormat(backgroundFormat);
        }
      }}
    >
      <MdSwapHoriz />
    </button>
  );
};

const Form = () => {
  const {
    backgroundColor,
    foregroundColor,
    shareLink,
    setToast,
    colorHistory,
    setColorHistory,
    toggleHistory,
    showHistory,
  } = useContext(AppContext);

  const [clipboard, copyToClipboard] = useCopyToClipboard();

  return (
    <div className="form__outer">
      <form
        className="form"
        action="/"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="form__actions">
          {shareLink && (
            <button
              onClick={(e) => {
                copyToClipboard(shareLink);
                setToast({
                  show: true,
                  message: `Successfully copied to clipboard`,
                });
              }}
            >
              Copy Link
            </button>
          )}

          <button
            onClick={(e) => {
              const newHistory = [
                [backgroundColor.toHexString(), foregroundColor.toHexString()],
                ...colorHistory,
              ];

              setColorHistory(newHistory);
              toggleHistory(true);
            }}
          >
            Save to history
          </button>

          <button className="form__actions-history" onClick={toggleHistory}>
            {showHistory ? "Hide" : "Show"} history
          </button>
        </div>

        <h1 className="form__title">Check Color Contrast</h1>
        <p className="form__subtitle">Enter any two valid colors below</p>

        <InputBackground />
        <SwapButton />
        <InputForeground />
      </form>

      <DemoContent />
    </div>
  );
};

export default Form;
