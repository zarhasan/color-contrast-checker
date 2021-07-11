import React, { useContext } from "react";
import tinycolor from "tinycolor2";
import { MdSwapHoriz } from "react-icons/md";
import { AppContext } from "../store";
import Input from "./Input";

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

const ContrastResult = () => {
  const { contrastRatio } = useContext(AppContext);

  let resultColor = "#43a047";

  if (contrastRatio < 4.5 && contrastRatio > 3.1) {
    resultColor = "#f57f17";
  } else if (contrastRatio < 3.1) {
    resultColor = "#d32f2f";
  } else {
    resultColor = "#43a047";
  }

  return (
    <div
      className="form__result"
      style={{
        backgroundColor: resultColor,
      }}
    >
      {contrastRatio ? contrastRatio.toFixed(2) : 0}
    </div>
  );
};

const Form = () => {
  const { backgroundColor, foregroundColor } = useContext(AppContext);

  return (
    <form
      className="form"
      action="/"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="form__title">
        <svg
          width="150"
          height="150"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="74.6154"
            cy="74.6154"
            r="64.6154"
            fill={backgroundColor.toHexString()}
          />
          <path
            d="M75 150C33.5775 150 0 116.422 0 75C0 33.5775 33.5775 0 75 0C116.422 0 150 33.5775 150 75C150 116.422 116.422 150 75 150ZM75 135C90.913 135 106.174 128.679 117.426 117.426C128.679 106.174 135 90.913 135 75C135 59.087 128.679 43.8258 117.426 32.5736C106.174 21.3214 90.913 15 75 15C59.087 15 43.8258 21.3214 32.5736 32.5736C21.3214 43.8258 15 59.087 15 75C15 90.913 21.3214 106.174 32.5736 117.426C43.8258 128.679 59.087 135 75 135V135ZM37.5 99.9C53.6629 98.7387 68.8627 91.7794 80.3025 80.3025C91.7794 68.8627 98.7387 53.6629 99.9 37.5C105.442 41.1921 110.095 46.068 113.524 51.7762C116.953 57.4843 119.073 63.8824 119.73 70.5088C120.387 77.1353 119.566 83.8251 117.324 90.0956C115.083 96.3661 111.478 102.061 106.77 106.77C102.061 111.478 96.3661 115.083 90.0956 117.324C83.8251 119.566 77.1353 120.387 70.5088 119.73C63.8824 119.073 57.4843 116.953 51.7762 113.524C46.068 110.095 41.1921 105.442 37.5 99.9V99.9Z"
            fill={foregroundColor.toHexString()}
          />
        </svg>

        <h1>Check Color Contrast</h1>
        <p>Enter any two valid colors below</p>
      </div>
      <InputBackground />
      <SwapButton />
      <InputForeground />
      <ContrastResult />
    </form>
  );
};

export default Form;
