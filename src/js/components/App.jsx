import React, { useState, useRef, useEffect } from "react";
import { AppContext } from "../store";
import { useFavicon, useLocalStorage, useToggle } from "react-use";
import tinycolor from "tinycolor2";
import Form from "./Form";
import Toast from "./Toast";
import ColorHistory from "./ColorHistory";
import Footer from "./Footer";

const colors = [
  ["#16161a", "#ff8906"],
  ["#212c34", "#fb5870"],
  ["#232946", "#eebbc3"],
  ["#004643", "#f9bc60"],
  ["#55423d", "#ffc0ad"],
  ["#000000", "#7f5af0"],
  ["#1a2037", "#3a97d4"],
  ["#1c234a", "#1bfaad"],
  ["#020a53", "#f6e679"],
  ["#2c0032", "#82fc00"],
];

const formats = [
  { id: 1, name: "hex", unavailable: false },
  { id: 2, name: "rgb", unavailable: false },
  { id: 3, name: "hsl", unavailable: false },
  { id: 4, name: "hsv", unavailable: false },
  { id: 5, name: "name", unavailable: false },
];

const App = () => {
  const [colorsIndex, setColorIndex] = useLocalStorage("colorIndex", 0);
  const [colorHistory, setColorHistory] = useLocalStorage(
    "colorHistory",
    colors
  );

  const [showHistory, toggleHistory] = useToggle(false);

  const [backgroundColor, setBackgroundColor] = useState(
    tinycolor(colors[colorsIndex] ? colors[colorsIndex][0] : colors[0][1])
  );
  const [foregroundColor, setForegroundColor] = useState(
    tinycolor(colors[colorsIndex] ? colors[colorsIndex][1] : colors[0][1])
  );

  const [contrastRatio, setContrastRatio] = useState(
    tinycolor.readability(backgroundColor, foregroundColor)
  );

  const [backgroundColorPicker, setBackgroundColorPicker] = useState(
    backgroundColor.toHexString()
  );
  const [foregroundColorPicker, setForegroundColorPicker] = useState(
    foregroundColor.toHexString()
  );

  const [backgroundColorFormat, setBackgroundColorFormat] = useState(
    formats[0]
  );
  const [foregroundColorFormat, setForegroundColorFormat] = useState(
    formats[0]
  );

  const [toast, setToast] = useState({
    show: false,
    message: "",
  });

  const backgroundColorInput = useRef(null);
  const foregroundColorInput = useRef(null);

  const [shareLink, setShareLink] = useState();
  const baseURL = `${window.location.origin}${window.location.pathname}`;

  useEffect(() => {
    if (!backgroundColor.isValid() || !foregroundColor.isValid()) {
      return;
    }

    setContrastRatio(tinycolor.readability(backgroundColor, foregroundColor));

    const newURLParams = new URLSearchParams({
      background_color: backgroundColor.toHexString(),
      foreground_color: foregroundColor.toHexString(),
    }).toString();

    setShareLink(`${baseURL}?${newURLParams}`);
  }, [backgroundColor, foregroundColor]);

  useFavicon(
    `data:image/svg+xml,%3Csvg width='163' height='163' viewBox='0 0 163 163' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M81.5 89.5C81.5 130.093 81.5 155 81.5 155C40.9071 155 8 122.093 8 81.5C8 40.9071 40.9071 8 81.5 8C81.5 8 81.5 48.9071 81.5 89.5Z' fill='%23${encodeURI(
      backgroundColor.toHex()
    )}'/%3E%3Cpath d='M81 73.5C81 32.9071 81 8 81 8C121.593 8 154.5 40.9071 154.5 81.5C154.5 122.093 121.593 155 81 155C81 155 81 114.093 81 73.5Z' fill='%23${encodeURI(
      backgroundColor.toHex()
    )}'/%3E%3Cpath d='M81.5 162.75C36.6256 162.75 0.25 126.374 0.25 81.5C0.25 36.6256 36.6256 0.25 81.5 0.25C126.374 0.25 162.75 36.6256 162.75 81.5C162.75 126.374 126.374 162.75 81.5 162.75ZM81.5 146.5C98.7391 146.5 115.272 139.652 127.462 127.462C139.652 115.272 146.5 98.7391 146.5 81.5C146.5 64.2609 139.652 47.7279 127.462 35.5381C115.272 23.3482 98.7391 16.5 81.5 16.5C64.2609 16.5 47.7279 23.3482 35.5381 35.5381C23.3482 47.7279 16.5 64.2609 16.5 81.5C16.5 98.7391 23.3482 115.272 35.5381 127.462C47.7279 139.652 64.2609 146.5 81.5 146.5V146.5ZM40.875 108.475C58.3848 107.217 74.8512 99.6777 87.2444 87.2444C99.6777 74.8512 107.217 58.3848 108.475 40.875C114.479 44.8747 119.52 50.157 123.235 56.3408C126.949 62.5247 129.246 69.4559 129.958 76.6346C130.67 83.8133 129.779 91.0605 127.351 97.8535C124.923 104.647 121.018 110.816 115.917 115.917C110.816 121.018 104.647 124.923 97.8535 127.351C91.0605 129.779 83.8133 130.67 76.6346 129.958C69.4559 129.246 62.5247 126.949 56.3408 123.235C50.157 119.52 44.8747 114.479 40.875 108.475V108.475Z' fill='%23${encodeURI(
      foregroundColor.toHex()
    )}'/%3E%3C/svg%3E`
  );

  useEffect(() => {
    if (colorsIndex >= 0 && colorsIndex < colors.length - 1) {
      setColorIndex(parseInt(colorsIndex) + 1);
    } else {
      setColorIndex(0);
    }

    if (!colors[colorsIndex]) {
      setColorIndex(0);
    }

    const urlParams = new URLSearchParams(window.location.search);

    if (window.location.search) {
      for (const param of urlParams.entries()) {
        if (param[0] === "background_color" && param[1]) {
          const background_color = tinycolor(param[1], {
            format: "hex",
          });

          setBackgroundColor(background_color);
          setBackgroundColorPicker(background_color.toHexString());
        }

        if (param[0] === "foreground_color" && param[1]) {
          const foreground_color = tinycolor(param[1], {
            format: "hex",
          });

          setForegroundColor(foreground_color);
          setForegroundColorPicker(foreground_color.toHexString());
        }
      }
    }
  }, []);

  const context = {
    backgroundColor,
    setBackgroundColor,
    foregroundColor,
    setForegroundColor,
    contrastRatio,
    setContrastRatio,
    backgroundColorPicker,
    setBackgroundColorPicker,
    foregroundColorPicker,
    setForegroundColorPicker,
    backgroundColorFormat,
    setBackgroundColorFormat,
    foregroundColorFormat,
    setForegroundColorFormat,
    toast,
    setToast,
    colorHistory,
    setColorHistory,
    showHistory,
    toggleHistory,
    backgroundColorInput,
    foregroundColorInput,
    shareLink,
  };

  return (
    <AppContext.Provider value={context}>
      <Form />
      <Footer />
      <ColorHistory />
      <Toast />
    </AppContext.Provider>
  );
};

export default App;
