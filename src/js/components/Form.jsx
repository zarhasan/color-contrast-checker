import React, { useEffect, useContext } from "react";
import tinycolor from "tinycolor2";
import { calculateContrastRatio } from "../helper";
import { AppContext } from "../store";

const Form = () => {
  const {
    backgroundColor,
    foregroundColor,
    contrastRatio,
    setBackgroundColor,
    setForegroundColor,
    setContrastRatio,
  } = useContext(AppContext);

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
      setContrastRatio(
        calculateContrastRatio(backgroundColor, foregroundColor)
      );
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
            type="text"
            name="backgroundColor"
            id="backgroundColor"
            onChange={(e) => {
              const color = tinycolor(e.target.value);

              if (!color.isValid) {
                return;
              }

              setBackgroundColor({
                rgba: color.toRgb(),
                luminance: color.getLuminance(),
              });
            }}
          />
        </div>

        <div className="contrast_checker__input">
          <label htmlFor="foregroundColor">Foreground Color</label>
          <input
            type="text"
            name="foregroundColor"
            id="foregroundColor"
            onChange={(e) => {
              const color = tinycolor(e.target.value);

              if (!color.isValid) {
                return;
              }

              setForegroundColor({
                rgba: color.toRgb(),
                luminance: color.getLuminance(),
              });
            }}
          />
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
