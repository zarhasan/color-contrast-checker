import React, { useEffect, useState, Fragment } from "react";
import tinycolor from "tinycolor2";
import { motion, AnimatePresence } from "framer-motion";
import { Listbox } from "@headlessui/react";
import debounce from "lodash/debounce";

import { FiEdit2 } from "react-icons/fi";
import { PhotoshopPicker } from "react-color";

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
    toggleColorPicker,
    setColorPicker,
    setColor,
    inputColor,
    colorPicker,
    showColorPicker,
    id,
    title,
  } = props;

  const [selectedFormat, setSelectedFormat] = useState(formats[0]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setColorPicker(`#${color.toHex()}`);

    formats.forEach(function (format, index) {
      if (format.name === color.getFormat()) {
        setSelectedFormat(formats[index]);
      }
    });
  }, [color]);

  useEffect(() => {
    if (editing === true) {
      return;
    }

    const convertedString = color.toString(selectedFormat.name);

    if (convertedString) {
      inputColor.current.value = convertedString;
    }
  }, [selectedFormat, colorPicker]);

  return (
    <div className="contrast_checker__input">
      <label htmlFor={id}>{title}</label>

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
                  disabled={format.name === selectedFormat.name}
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

            setColor(colorValue);
          }, 300)}
        />
        <button
          className="contrast_checker__picker-button"
          style={{
            backgroundColor: colorPicker,
            color: tinycolor
              .mostReadable(colorPicker, ["#000", "#fff"])
              .toHexString(),
          }}
          onClick={(e) => {
            showColorPicker
              ? toggleColorPicker(false)
              : toggleColorPicker(true);
          }}
        >
          <FiEdit2 />
        </button>
      </div>

      <AnimatePresence>
        {showColorPicker && (
          <motion.div
            className="contrast_checker__picker-wrap"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            <PhotoshopPicker
              color={colorPicker}
              onChange={(pickedColor, e) => {
                setColorPicker(pickedColor.hex);

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

                setColor(color);
              }}
              onAccept={(e) => {
                toggleColorPicker(false);
              }}
              onCancel={(e) => {
                toggleColorPicker(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;
