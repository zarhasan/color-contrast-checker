import React, { useState, useRef, useEffect } from "react";
import { AppContext } from "../store";
import { GoMarkGithub } from "react-icons/go";
import { FiExternalLink } from "react-icons/fi";
import { useLocalStorage } from "react-use";
import tinycolor from "tinycolor2";
import Form from "./Form";
import Elements from "./Elements";

const colors = [
  ["#16161a", "#ff8906"],
  ["#232946", "#eebbc3"],
  ["#004643", "#f9bc60"],
  ["#55423d", "#ffc0ad"],
  ["#000000", "#7f5af0"],
];

const App = () => {
  const [colorsIndex, setColorIndex] = useLocalStorage("colorIndex", 0);

  const [backgroundColor, setBackgroundColor] = useState(
    tinycolor(colors[colorsIndex][0])
  );
  const [foregroundColor, setForegroundColor] = useState(
    tinycolor(colors[colorsIndex][1])
  );

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

  useEffect(() => {
    if (colorsIndex >= 0 && colorsIndex < colors.length - 1) {
      setColorIndex(parseInt(colorsIndex) + 1);
    } else {
      setColorIndex(0);
    }
  }, []);

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
