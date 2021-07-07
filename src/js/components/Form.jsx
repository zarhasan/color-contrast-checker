import React, { useEffect, useContext, useState, useRef } from "react";
import tinycolor from "tinycolor2";
import { AppContext } from "../store";
import { PhotoshopPicker } from "react-color";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2 } from "react-icons/fi";
const Form = () => {
  const {
    backgroundColor,
    foregroundColor,
    contrastRatio,
    setBackgroundColor,
    setForegroundColor,
    setContrastRatio,
  } = useContext(AppContext);

  const [colorPickerBackground, setColorPickerBackground] = useState("");
  const [colorPickerForeground, setColorPickerForeground] = useState("");

  const [showColorPickerBackground, setShowColorPickerBackground] =
    useState(false);
  const [showColorPickerForeground, setShowColorPickerForeground] =
    useState(false);

  const backgroundColorInput = useRef(null);

  let resultColor = "#43a047";

  if (contrastRatio < 4.5 && contrastRatio > 3.1) {
    resultColor = "#f57f17";
  } else if (contrastRatio < 3.1) {
    resultColor = "#d32f2f";
  } else {
    resultColor = "#43a047";
  }

  useEffect(() => {
    if (backgroundColor && foregroundColor) {
      setContrastRatio(tinycolor.readability(backgroundColor, foregroundColor));
    }
  }, [backgroundColor, foregroundColor]);

  return (
    <>
      <form
        className="contrast_checker__form"
        action="/"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="contrast_checker__input">
          <label htmlFor="backgroundColor">Background Color</label>
          <input
            ref={backgroundColorInput}
            type="text"
            name="backgroundColor"
            id="backgroundColor"
            onChange={(e) => {
              if (!e.target.value) {
                return;
              }
              const color = tinycolor(e.target.value);

              if (!color.isValid()) {
                return;
              }

              setColorPickerBackground(`#${color.toHex()}`);
              setBackgroundColor(color);
            }}
          />

          <button
            className="contrast_checker__picker-button"
            style={{
              backgroundColor: colorPickerBackground,
              color:
                tinycolor.readability(colorPickerBackground, "#fff") < 4.5
                  ? "#000"
                  : "#fff",
            }}
            onClick={(e) => {
              setShowColorPickerBackground(true);
            }}
          >
            <FiEdit2 />
          </button>

          <AnimatePresence>
            {showColorPickerBackground && (
              <motion.div
                className="contrast_checker__picker-wrap"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              >
                {showColorPickerBackground && (
                  <PhotoshopPicker
                    color={colorPickerBackground}
                    onChange={(pickedColor, e) => {
                      setColorPickerBackground(pickedColor.hex);

                      const color = tinycolor(pickedColor.hex);

                      if (!color.isValid()) {
                        return;
                      }

                      backgroundColorInput.current.value = color.toHexString();

                      setBackgroundColor(color);
                    }}
                    onAccept={(e) => {
                      setShowColorPickerBackground(false);
                    }}
                    onCancel={(e) => {
                      setShowColorPickerBackground(false);
                    }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="contrast_checker__swap">
          <button
            onClick={(e) => {
              const background = backgroundColor;
              const foreground = foregroundColor;

              setBackgroundColor(foreground);
              setForegroundColor(background);
            }}
          >
            Swap
          </button>
        </div>
        <div className="contrast_checker__input">
          <label htmlFor="foregroundColor">Foreground Color</label>
          <input
            type="text"
            name="foregroundColor"
            id="foregroundColor"
            onChange={(e) => {
              if (!e.target.value) {
                return;
              }
              const color = tinycolor(e.target.value);

              if (!color.isValid()) {
                return;
              }
              setForegroundColor(color);
            }}
          />

          <button
            className="contrast_checker__picker-button"
            style={{
              backgroundColor: colorPickerForeground,
              color:
                tinycolor.readability(colorPickerForeground, "#fff") < 4.5
                  ? "#000"
                  : "#fff",
            }}
            onClick={(e) => {
              setShowColorPickerForeground(true);
            }}
          >
            <FiEdit2 />
          </button>

          <AnimatePresence>
            {showColorPickerForeground && (
              <motion.div
                className="contrast_checker__picker-wrap"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              >
                <PhotoshopPicker
                  color={colorPickerForeground}
                  onChange={(pickedColor, e) => {
                    setColorPickerForeground(pickedColor.hex);

                    const color = tinycolor(pickedColor.hex);

                    if (!color.isValid()) {
                      return;
                    }

                    setForegroundColor(color);
                  }}
                  onAccept={(e) => {
                    setShowColorPickerForeground(false);
                  }}
                  onCancel={(e) => {
                    setShowColorPickerForeground(false);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div
          className="contrast_checker__result"
          style={{
            backgroundColor: resultColor,
          }}
        >
          {contrastRatio ? contrastRatio.toFixed(2) : 0}
        </div>
      </form>
    </>
  );
};

export default Form;
