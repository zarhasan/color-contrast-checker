import React, { useEffect, useContext, useState, Fragment } from "react";
import tinycolor from "tinycolor2";
import { motion, AnimatePresence } from "framer-motion";
import { Listbox } from "@headlessui/react";
import debounce from "lodash/debounce";

import { FiEdit2 } from "react-icons/fi";
import { MdSwapHoriz } from "react-icons/md";
import { PhotoshopPicker } from "react-color";

import { AppContext } from "../store";

const formats = [
  { id: 1, name: "hex", unavailable: false },
  { id: 2, name: "rgb", unavailable: false },
  { id: 3, name: "hsl", unavailable: false },
  { id: 4, name: "hsv", unavailable: false },
  { id: 5, name: "name", unavailable: false },
];

const InputBackgroundColor = () => {
  const {
    backgroundColor,
    toggleColorPickerBackground,
    setColorPickerBackground,
    setBackgroundColor,
    inputColorBackground,
    colorPickerBackground,
    showColorPickerBackground,
  } = useContext(AppContext);

  const [selectedFormat, setSelectedFormat] = useState(formats[0]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setColorPickerBackground(`#${backgroundColor.toHex()}`);

    formats.forEach(function (format, index) {
      if (format.name === backgroundColor.getFormat()) {
        setSelectedFormat(formats[index]);
      }
    });
  }, [backgroundColor]);

  useEffect(() => {
    if (editing === true) {
      return;
    }

    const convertedString = backgroundColor.toString(selectedFormat.name);

    if (convertedString) {
      inputColorBackground.current.value = convertedString;
    }
  }, [selectedFormat, colorPickerBackground]);

  return (
    <div className="contrast_checker__input">
      <label htmlFor="backgroundColor">Background Color</label>

      <div className="contrast_checker__input-inner">
        <div className="contrast_checker__format">
          <Listbox value={selectedFormat} onChange={setSelectedFormat}>
            <Listbox.Button className="contrast_checker__format-button">
              {selectedFormat.name}
            </Listbox.Button>
            <Listbox.Options className="contrast_checker__format-dropdown">
              {formats.map((format) => (
                <Listbox.Option
                  key={format.id}
                  value={format}
                  disabled={format.unavailable}
                  as={Fragment}
                >
                  {({ active, selected }) => (
                    <li
                      className={`${active ? "active" : ""}${
                        selected ? " selected" : ""
                      }`}
                    >
                      {format.name}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>

        <input
          ref={inputColorBackground}
          type="text"
          name="backgroundColor"
          id="backgroundColor"
          onFocus={(e) => {
            setEditing(true);
          }}
          onBlur={(e) => {
            setEditing(false);
          }}
          onChange={debounce((e) => {
            if (!e.target.value) {
              return;
            }
            const color = tinycolor(e.target.value);

            if (!color.isValid()) {
              return;
            }

            setBackgroundColor(color);
          }, 300)}
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
            showColorPickerBackground
              ? toggleColorPickerBackground(false)
              : toggleColorPickerBackground(true);
          }}
        >
          <FiEdit2 />
        </button>
      </div>

      <AnimatePresence>
        {showColorPickerBackground && (
          <motion.div
            className="contrast_checker__picker-wrap"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            <PhotoshopPicker
              color={colorPickerBackground}
              onChange={(pickedColor, e) => {
                setColorPickerBackground(pickedColor.hex);

                const color = tinycolor(
                  pickedColor[
                    selectedFormat && selectedFormat.name != "name"
                      ? selectedFormat.name
                      : "hex"
                  ]
                );

                if (!color.isValid()) {
                  return;
                }

                setBackgroundColor(color);
              }}
              onAccept={(e) => {
                toggleColorPickerBackground(false);
              }}
              onCancel={(e) => {
                toggleColorPickerBackground(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InputForegroundColor = () => {
  const {
    foregroundColor,
    showColorPickerForeground,
    toggleColorPickerForeground,
    setColorPickerForeground,
    setForegroundColor,
    colorPickerForeground,
    inputColorForeground,
  } = useContext(AppContext);

  const [selectedFormat, setSelectedFormat] = useState(formats[0]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setColorPickerForeground(`#${foregroundColor.toHex()}`);

    formats.forEach(function (format, index) {
      if (format.name === foregroundColor.getFormat()) {
        setSelectedFormat(formats[index]);
      }
    });
  }, [foregroundColor]);

  useEffect(() => {
    if (editing === true) {
      return;
    }

    const convertedString = foregroundColor.toString(selectedFormat.name);

    if (convertedString) {
      inputColorForeground.current.value = convertedString;
    }
  }, [selectedFormat, colorPickerForeground]);

  return (
    <div className="contrast_checker__input">
      <label htmlFor="foregroundColor">Foreground Color</label>

      <div className="contrast_checker__input-inner">
        <div className="contrast_checker__format">
          <Listbox value={selectedFormat} onChange={setSelectedFormat}>
            <Listbox.Button className="contrast_checker__format-button">
              {selectedFormat.name}
            </Listbox.Button>
            <Listbox.Options className="contrast_checker__format-dropdown">
              {formats.map((format) => (
                <Listbox.Option
                  key={format.id}
                  value={format}
                  disabled={format.unavailable}
                  as={Fragment}
                >
                  {({ active, selected }) => (
                    <li
                      className={`${active ? "active" : ""} ${
                        selected ? "selected" : ""
                      }`}
                    >
                      {format.name}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        <input
          ref={inputColorForeground}
          type="text"
          name="foregroundColor"
          id="foregroundColor"
          onFocus={(e) => {
            setEditing(true);
          }}
          onBlur={(e) => {
            setEditing(false);
          }}
          onChange={debounce((e) => {
            if (!e.target.value) {
              return;
            }
            const color = tinycolor(e.target.value);

            if (!color.isValid()) {
              return;
            }

            setForegroundColor(color);
          }, 300)}
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
            showColorPickerForeground
              ? toggleColorPickerForeground(false)
              : toggleColorPickerForeground(true);
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

                  const color = tinycolor(
                    pickedColor[
                      selectedFormat && selectedFormat.name != "name"
                        ? selectedFormat.name
                        : "hex"
                    ]
                  );

                  if (!color.isValid()) {
                    return;
                  }

                  setForegroundColor(color);
                }}
                onAccept={(e) => {
                  toggleColorPickerForeground(false);
                }}
                onCancel={(e) => {
                  toggleColorPickerForeground(false);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ButtonSwap = () => {
  const {
    backgroundColor,
    foregroundColor,
    setBackgroundColor,
    setForegroundColor,
  } = useContext(AppContext);

  return (
    <button
      className="contrast_checker__swap"
      onClick={(e) => {
        const background = backgroundColor;
        const foreground = foregroundColor;

        setBackgroundColor(foreground);
        setForegroundColor(background);
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
      {backgroundColor && <InputBackgroundColor />}
      <ButtonSwap />
      {foregroundColor && <InputForegroundColor />}
      <ContrastResult />
    </form>
  );
};

export default Form;
