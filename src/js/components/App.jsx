import React, { useEffect, useState, useRef } from "react";
import tinycolor from "tinycolor2";
import { AppContext } from "../store";
import Form from "./Form";
import Elements from "./Elements";

const App = () => {
  const [backgroundColor, setBackgroundColor] = useState(null);
  const [foregroundColor, setForegroundColor] = useState();

  const [contrastRatio, setContrastRatio] = useState("");

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

  useEffect(() => {
    setBackgroundColor(tinycolor("#ffffff"));
    setForegroundColor(tinycolor("#00796b"));
    setContrastRatio(tinycolor.readability(backgroundColor, foregroundColor));
  }, []);

  return (
    <AppContext.Provider value={context}>
      <Form />
      <Elements />
    </AppContext.Provider>
  );
};

export default App;
