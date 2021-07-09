import React, { useEffect, useContext } from "react";
import tinycolor from "tinycolor2";
import { MdSwapHoriz } from "react-icons/md";
import { AppContext } from "../store";
import Input from "./Input";

const InputBackground = () => {
  const {
    backgroundColor,
    toggleColorPickerBackground,
    setColorPickerBackground,
    setBackgroundColor,
    inputColorBackground,
    colorPickerBackground,
    showColorPickerBackground,
  } = useContext(AppContext);

  return (
    <Input
      color={backgroundColor}
      toggleColorPicker={toggleColorPickerBackground}
      setColorPicker={setColorPickerBackground}
      setColor={setBackgroundColor}
      inputColor={inputColorBackground}
      colorPicker={colorPickerBackground}
      showColorPicker={showColorPickerBackground}
      id={"backgroundColor"}
      title={"Background Color"}
    />
  );
};

const InputForeground = () => {
  const {
    foregroundColor,
    showColorPickerForeground,
    toggleColorPickerForeground,
    setColorPickerForeground,
    setForegroundColor,
    colorPickerForeground,
    inputColorForeground,
  } = useContext(AppContext);

  return (
    <Input
      color={foregroundColor}
      toggleColorPicker={toggleColorPickerForeground}
      setColorPicker={setColorPickerForeground}
      setColor={setForegroundColor}
      inputColor={inputColorForeground}
      colorPicker={colorPickerForeground}
      showColorPicker={showColorPickerForeground}
      id={"foregroundColor"}
      title={"Foreground Color"}
    />
  );
};

const ButtonSwap = () => {
  const {
    inputColorBackground,
    inputColorForeground,
    setBackgroundColor,
    setForegroundColor,
  } = useContext(AppContext);

  return (
    <button
      className="contrast_checker__swap"
      onClick={(e) => {
        const background = inputColorBackground.current.value;
        const foreground = inputColorForeground.current.value;

        inputColorBackground.current.value = foreground;
        inputColorForeground.current.value = background;

        const colorBackground = tinycolor(background);
        const colorForeground = tinycolor(foreground);

        if (colorForeground.isValid()) {
          setBackgroundColor(colorForeground);
        }

        if (colorBackground.isValid()) {
          setForegroundColor(colorBackground);
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
      className="contrast_checker__result"
      style={{
        backgroundColor: resultColor,
      }}
    >
      {contrastRatio ? contrastRatio.toFixed(2) : 0}
    </div>
  );
};

const Form = () => {
  const { backgroundColor, foregroundColor, setContrastRatio } =
    useContext(AppContext);

  useEffect(() => {
    if (backgroundColor && foregroundColor) {
      setContrastRatio(tinycolor.readability(backgroundColor, foregroundColor));
    }
  }, [backgroundColor, foregroundColor]);

  return (
    <form
      className="contrast_checker__form"
      action="/"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <InputBackground />
      <ButtonSwap />
      <InputForeground />
      <ContrastResult />
    </form>
  );
};

export default Form;
