import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { AppContext } from "../store";
import { FiX, FiCheck, FiExternalLink, FiSave, FiShare2 } from "react-icons/fi";
import tinycolor from "tinycolor2";
import tippy from "tippy.js";

const DemoContent = () => {
  const { backgroundColor, foregroundColor } = useContext(AppContext);

  return (
    <div className="form__demo-outer">
      <ContrastResult />
      <div
        className="form__demo"
        style={{
          backgroundColor: backgroundColor ? backgroundColor.toHexString() : "",
          color: foregroundColor ? foregroundColor.toHexString() : "",
          borderColor: foregroundColor.toHexString(),
        }}
      >
        <Validation
          requirement={7.1}
          message="Small text such as this should have contrast level of at least 7.1"
        >
          <ul
            className="form__demo-categories"
            style={{
              color: backgroundColor.toHexString(),
            }}
          >
            <li
              style={{
                backgroundColor: foregroundColor.toHexString(),
              }}
            >
              Accessibility
            </li>

            <li
              style={{
                backgroundColor: foregroundColor.toHexString(),
              }}
            >
              Color Contrast
            </li>

            <li
              style={{
                backgroundColor: foregroundColor.toHexString(),
              }}
            >
              WCAG 2.1
            </li>
          </ul>
        </Validation>

        <Validation
          requirement={4.5}
          message="Small text such as this should have contrast level of at least 4.5"
        >
          <h2>This is a large text for demo</h2>
        </Validation>

        <Validation
          requirement={7.1}
          message="Small text such as this should have contrast level of at least 7.1"
        >
          {" "}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
            repudiandae molestias numquam quia tempore corrupti quibusdam iusto
            voluptatem magnam nihil nostrum obcaecati dolorum ipsa deserunt
            veritatis itaque, ut autem optio.
          </p>
        </Validation>

        <Validation
          requirement={3.1}
          message="Non-textual such as icons or border should have contrast level of at least 3.1"
        >
          <ul className="form__demo-buttons">
            <li>
              <FiExternalLink />
            </li>
            <li>
              <FiSave />
            </li>
            <li>
              <FiShare2 />
            </li>
          </ul>
        </Validation>
      </div>
    </div>
  );
};

const Validation = ({ requirement, message, children }) => {
  const { contrastRatio, backgroundColor } = useContext(AppContext);
  const validation = useRef(null);
  const tooltip = useRef(null);
  let tooltipInstance;

  useLayoutEffect(() => {
    tooltipInstance = tippy(validation.current, {
      animation: "shift-away",
      theme: "primary",
      content(reference) {
        return tooltip.current.innerHTML;
      },
      allowHTML: true,
    });
  });

  useEffect(() => {
    return () => {
      tooltipInstance.destroy();
    };
  });

  return (
    <div
      ref={validation}
      className={`form__demo-validation${
        contrastRatio > requirement ? " pass" : " fail"
      }`}
      style={{
        outlineColor: tinycolor
          .mostReadable(backgroundColor, ["#000000", "#ffffff"])
          .toHexString(),
      }}
    >
      {children}

      <div ref={tooltip} className="form__demo-tooltip">
        <p>{message}</p>
      </div>
    </div>
  );
};

const ContrastResult = () => {
  const { contrastRatio } = useContext(AppContext);

  let resultColor = "#2e7d32";

  if (contrastRatio < 4.5 && contrastRatio > 3.1) {
    resultColor = "#f57f17";
  } else if (contrastRatio < 3.1) {
    resultColor = "#c62828";
  } else {
    resultColor = "#2e7d32";
  }

  return (
    <div
      className="form__result"
      style={{
        borderColor: resultColor,
      }}
    >
      <b
        style={{
          backgroundColor: resultColor,
        }}
      >
        {contrastRatio ? contrastRatio.toFixed(2) : 0}
      </b>

      {contrastRatio < 4.5 && contrastRatio > 3.1 && (
        <span>
          {" "}
          is good for non-textual elements such as icons and images.{" "}
        </span>
      )}

      {contrastRatio < 3.1 && (
        <span> is not a good contrast ratio for any element. </span>
      )}

      {contrastRatio >= 4.5 && contrastRatio < 7.1 && (
        <span> is good for large text but not small text. </span>
      )}

      {contrastRatio >= 7.1 && (
        <span> is good for all elements including small text. </span>
      )}
    </div>
  );
};

export default DemoContent;
