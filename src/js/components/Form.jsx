import React, { useEffect, useContext } from "react";
import tinycolor from "tinycolor2";
import { MdSwapHoriz } from "react-icons/md";
import { AppContext } from "../store";
import Input from "./Input";

const InputBackground = () => {
  const {
    backgroundColor,
    setColorPickerBackground,
    setBackgroundColor,
    inputColorBackground,
    colorPickerBackground,
  } = useContext(AppContext);

  return (
    <Input
      color={backgroundColor}
      setColorPicker={setColorPickerBackground}
      setColor={setBackgroundColor}
      inputColor={inputColorBackground}
      colorPicker={colorPickerBackground}
      id={"backgroundColor"}
      title={"Background Color"}
    />
  );
};

const InputForeground = () => {
  const {
    foregroundColor,
    setColorPickerForeground,
    setForegroundColor,
    colorPickerForeground,
    inputColorForeground,
  } = useContext(AppContext);

  return (
    <Input
      color={foregroundColor}
      setColorPicker={setColorPickerForeground}
      setColor={setForegroundColor}
      inputColor={inputColorForeground}
      colorPicker={colorPickerForeground}
      id={"foregroundColor"}
      title={"Foreground Color"}
    />
  );
};

const SwapButton = () => {
  const {
    inputColorBackground,
    inputColorForeground,
    setBackgroundColor,
    setForegroundColor,
    colorPickerBackground,
    colorPickerForeground,
    setColorPickerBackground,
    setColorPickerForeground,
  } = useContext(AppContext);

  return (
    <button
      className="form__swap"
      onClick={(e) => {
        const background = inputColorBackground.current.value;
        const foreground = inputColorForeground.current.value;

        const colorBackground = tinycolor(background);
        const colorForeground = tinycolor(foreground);

        const pickerBackground = colorPickerBackground;
        const pickerForeground = colorPickerForeground;

        if (colorForeground.isValid()) {
          setBackgroundColor(colorForeground);
          setColorPickerBackground(pickerForeground);
        }

        if (colorBackground.isValid()) {
          setForegroundColor(colorBackground);
          setColorPickerForeground(pickerBackground);
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
  return (
    <form
      className="form"
      action="/"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <InputBackground />
      <SwapButton />
      <InputForeground />
      <ContrastResult />
    </form>
  );
};

export default Form;
