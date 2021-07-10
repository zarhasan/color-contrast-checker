import React, { useEffect, useState, Fragment, useRef } from "react";
import tinycolor from "tinycolor2";
import debounce from "lodash/debounce";
import { motion, AnimatePresence } from "framer-motion";
import { Listbox } from "@headlessui/react";
import { MdColorize, MdContentCopy } from "react-icons/md";
import { useClickAway, useCopyToClipboard, useToggle } from "react-use";
import { HexColorPicker } from "react-colorful";

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
  } = props;

  const [selectedFormat, setSelectedFormat] = useState(formats[0]);
  const [editing, setEditing] = useState(false);
  const [showColorPicker, toggleColorPicker] = useToggle(false);
  const [clipboard, copyToClipboard] = useCopyToClipboard();

  const picker = useRef(null);
  const inputOuter = useRef(null);

  useClickAway(picker, (e) => {
    if (inputOuter.current.contains(e.target)) {
      return;
    }

    toggleColorPicker(false);
  });

  function formatColor() {
    const convertedString = color.toString(selectedFormat.name);

    if (convertedString) {
      inputColor.current.value = convertedString;
    }
  }

  useEffect(() => {
    if (editing === true) {
      formats.forEach(function (format, index) {
        if (format.name === color.getFormat()) {
          setSelectedFormat(formats[index]);
        }
      });
    } else {
      formatColor();
    }
  }, [color]);

  useEffect(() => {
    if (editing === true) {
      return;
    }

    formatColor();
  }, [selectedFormat]);

  useEffect(() => {
    const pickedColor = tinycolor(colorPicker, {
      format: selectedFormat.name,
    });

    if (!pickedColor.isValid()) {
      return;
    }

    setColor(pickedColor);
  }, [colorPicker]);

  return (
    <div
      className={`form__input${editing ? " focused" : ""}${
        showColorPicker ? " picking" : ""
      }`}
      ref={inputOuter}
    >
      <label htmlFor={id}>
        {title}
        <button
          className="form__copy"
          onClick={(e) => {
            copyToClipboard(inputColor.current.value);
          }}
        >
          <MdContentCopy />
        </button>
      </label>

      <div className="form__input-inner">
        <div className="form__format">
          <Listbox value={selectedFormat} onChange={setSelectedFormat}>
            <Listbox.Button className="form__format-button">
              {selectedFormat.name}
            </Listbox.Button>
            <Listbox.Options className="form__format-dropdown">
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
            setColorPicker(colorValue.toHexString());
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
      </div>

      <AnimatePresence>
        {showColorPicker && (
          <motion.div
            ref={picker}
            className="form__picker-wrap"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            <HexColorPicker color={colorPicker} onChange={setColorPicker} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;
