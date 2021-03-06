import React, { useEffect, useState, Fragment, useRef } from "react";
import tinycolor from "tinycolor2";
import debounce from "lodash/debounce";
import { motion, AnimatePresence } from "framer-motion";
import { Listbox } from "@headlessui/react";
import { MdColorize } from "react-icons/md";
import { useClickAway, useCopyToClipboard, useToggle } from "react-use";
import { HexColorPicker } from "react-colorful";
import { useContext } from "react";
import { AppContext } from "../store";
const formats = [
  { id: 1, name: "hex", unavailable: false },
  { id: 2, name: "rgb", unavailable: false },
  { id: 3, name: "hsl", unavailable: false },
  { id: 4, name: "hsv", unavailable: false },
  { id: 5, name: "name", unavailable: false },
];

const Input = (props) => {
  const {
    color,
    setColorPicker,
    setColor,
    inputColor,
    colorPicker,
    id,
    title,
    colorFormat,
    setColorFormat,
  } = props;

  const { setToast, contrastRatio, backgroundColor, foregroundColor } =
    useContext(AppContext);

  const [editing, setEditing] = useState(false);
  const [showColorPicker, toggleColorPicker] = useToggle(false);
  const [clipboard, copyToClipboard] = useCopyToClipboard();

  const picker = useRef(null);
  const inputOuter = useRef(null);

  function formatColor() {
    const convertedString = color.toString(colorFormat.name);

    if (convertedString) {
      inputColor.current.value = convertedString;
    }
  }

  useClickAway(picker, (e) => {
    if (inputOuter.current.contains(e.target)) {
      return;
    }

    toggleColorPicker(false);
  });

  useEffect(() => {
    if (editing === true) {
      return;
    }

    formatColor();
  }, [colorFormat]);

  useEffect(() => {
    const args = {};

    if (editing === false) {
      args.format = colorFormat.name;
    }

    const pickedColor = tinycolor(colorPicker, args);

    if (!pickedColor.isValid()) {
      return;
    }

    setColor(pickedColor);

    if (editing === false) {
      formatColor();
    }
  }, [colorPicker]);

  function enhanceContrast(e, targetContrast) {
    let otherColor;

    if (tinycolor.equals(color, backgroundColor)) {
      otherColor = foregroundColor;
    } else {
      otherColor = backgroundColor;
    }

    const currentContrastWithDarker = tinycolor.readability(
      color.darken(1).toString(),
      otherColor
    );

    const currentContrastWithLighter = tinycolor.readability(
      color.lighten(1).toString(),
      otherColor
    );

    while (true) {
      const currentContrast = tinycolor.readability(
        backgroundColor,
        foregroundColor
      );

      if (currentContrastWithDarker > currentContrastWithLighter) {
        setColor(tinycolor(color.darken(1).toString()));
      } else {
        setColor(tinycolor(color.lighten(1).toString()));
      }

      if (
        color.getBrightness() === 255 ||
        color.getBrightness() === 0 ||
        currentContrast >= targetContrast
      ) {
        setColorPicker(color.toHexString());
        break;
      }
    }

    return;
  }

  return (
    <div
      className={`form__input${editing ? " focused" : ""}${
        showColorPicker ? " picking" : ""
      }`}
      ref={inputOuter}
    >
      <label htmlFor={id}>
        <span>{title}</span>
      </label>

      <div className="form__input-inner">
        <div className="form__format">
          <Listbox value={colorFormat} onChange={setColorFormat}>
            <Listbox.Button className="form__format-button">
              {colorFormat.name}
            </Listbox.Button>
            <Listbox.Options className="form__format-dropdown">
              {formats.map((format) => (
                <Listbox.Option
                  key={format.id}
                  value={format}
                  disabled={format.name === colorFormat.name}
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
          ref={inputColor}
          type="text"
          name={id}
          id={id}
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
            const colorValue = tinycolor(e.target.value);

            if (!colorValue.isValid()) {
              return;
            }

            setColorPicker(colorValue.toHexString());

            if (editing === true) {
              formats.forEach(function (format, index) {
                if (format.name === colorValue.getFormat()) {
                  setColorFormat(formats[index]);
                }
              });
            }
          }, 300)}
        />
        <button
          className="form__picker-button"
          style={{
            backgroundColor: colorPicker,
            color: tinycolor
              .mostReadable(colorPicker, ["#000", "#fff"])
              .toHexString(),
          }}
          onClick={toggleColorPicker}
        >
          <MdColorize />
        </button>

        <AnimatePresence>
          {showColorPicker && (
            <motion.div
              ref={picker}
              className="form__picker"
              initial={{
                y: 50,
                opacity: 0,
              }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            >
              <HexColorPicker color={colorPicker} onChange={setColorPicker} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="form__input-actions">
        {color.getBrightness() !== 255 &&
          color.getBrightness() !== 0 &&
          contrastRatio < 7.1 && (
            <button
              className="form__enhance"
              onClick={(e) => {
                enhanceContrast(e, contrastRatio < 4.5 ? 4.5 : 7.1);
              }}
            >
              Adjust for {contrastRatio < 4.5 ? "optimal" : "enhanced"} contrast
            </button>
          )}

        <button
          onClick={(e) => {
            copyToClipboard(inputColor.current.value);
            setToast({
              show: true,
              message: `Successfully copied "${inputColor.current.value}" to clipboard`,
            });
          }}
        >
          Copy to clipboard
        </button>
      </div>
    </div>
  );
};

export default Input;
