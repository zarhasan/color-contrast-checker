import React, { useState, useRef } from "react";
import tinycolor from "tinycolor2";
import { AppContext } from "../store";
import Form from "./Form";
import Elements from "./Elements";
import { GoMarkGithub } from "react-icons/go";
import { FiExternalLink } from "react-icons/fi";

const App = () => {
  const [backgroundColor, setBackgroundColor] = useState(tinycolor("#ffffff"));
  const [foregroundColor, setForegroundColor] = useState(tinycolor("#00796b"));

  const [contrastRatio, setContrastRatio] = useState(
    tinycolor.readability(backgroundColor, foregroundColor)
  );

  const [colorPickerBackground, setColorPickerBackground] = useState("");
  const [colorPickerForeground, setColorPickerForeground] = useState("");

  const [showColorPickerBackground, toggleColorPickerBackground] =
    useState(false);
  const [showColorPickerForeground, toggleColorPickerForeground] =
    useState(false);

  const inputColorBackground = useRef(null);
  const inputColorForeground = useRef(null);

  const context = {
    backgroundColor,
    setBackgroundColor,
    foregroundColor,
    setForegroundColor,
    contrastRatio,
    setContrastRatio,
    colorPickerBackground,
    setColorPickerBackground,
    showColorPickerBackground,
    toggleColorPickerBackground,
    showColorPickerForeground,
    toggleColorPickerForeground,
    colorPickerForeground,
    setColorPickerForeground,
    inputColorBackground,
    inputColorForeground,
  };

  return (
    <AppContext.Provider value={context}>
      <Form />
      <Elements />
      <a
        className="githubLink"
        href="https://github.com/zarhasan/color-contrast-checker"
        target="_blank"
      >
        <GoMarkGithub />
        GitHub
        <FiExternalLink />
      </a>
    </AppContext.Provider>
  );
};

export default App;
