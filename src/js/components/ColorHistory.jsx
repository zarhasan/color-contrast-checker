import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../store";
import { motion, AnimatePresence } from "framer-motion";
import tinycolor from "tinycolor2";
import { useClickAway } from "react-use";

const ColorHistory = () => {
  const {
    colorHistory,
    showHistory,
    toggleHistory,
    setBackgroundColorPicker,
    setForegroundColorPicker,
  } = useContext(AppContext);

  const history = useRef(null);

  useClickAway(history, (e) => {
    if (document.querySelector(".form__actions").contains(e.target)) {
      return;
    }

    toggleHistory(false);
  });

  return (
    <>
      <AnimatePresence>
        {showHistory && (
          <motion.div
            ref={history}
            className="history"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            <ul>
              {colorHistory.map((color, index) => (
                <li key={index}>
                  <button
                    onClick={(e) => {
                      setBackgroundColorPicker(color[0]);
                      setForegroundColorPicker(color[1]);
                    }}
                  >
                    <span
                      className="history__background"
                      style={{
                        backgroundColor: color[0],
                      }}
                    ></span>

                    <span
                      className="history__foreground"
                      style={{
                        backgroundColor: color[1],
                      }}
                    ></span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ColorHistory;
