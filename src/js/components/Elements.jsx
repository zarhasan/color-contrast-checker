import React, { useContext } from "react";
import { AppContext } from "../store";
import { FiX, FiCheck } from "react-icons/fi";
import tinycolor from "tinycolor2";

const Elements = () => {
  return (
    <div className="elements">
      <h2 className="elements__title">Examples</h2>
      <Text />
      <Form />
    </div>
  );
};

const Text = () => {
  const { backgroundColor, foregroundColor } = useContext(AppContext);

  return (
    <div
      className="elements__text"
      style={{
        backgroundColor: backgroundColor ? backgroundColor.toHexString() : "",
        color: foregroundColor ? foregroundColor.toHexString() : "",
      }}
    >
      <Validation
        requirement={4.5}
        message="WCAG 2.1 color contrast test for large text"
      >
        <h1>Heading 1</h1>
      </Validation>

      <Validation
        requirement={4.5}
        message="WCAG 2.1 color contrast test for large text"
      >
        <h2>Heading 2</h2>
      </Validation>

      <Validation
        requirement={4.5}
        message="WCAG 2.1 color contrast test for large text"
      >
        <h3>Heading 3</h3>
      </Validation>

      <Validation
        requirement={4.5}
        message="WCAG 2.1 color contrast test for large text"
      >
        <h4>Heading 4</h4>
      </Validation>

      <Validation
        requirement={4.5}
        message="WCAG 2.1 color contrast test for large text"
      >
        <h5>Heading 5</h5>
      </Validation>

      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
      <p>Paragraph</p>
    </div>
  );
};

const Form = () => {
  const { backgroundColor, foregroundColor } = useContext(AppContext);

  return (
    <form
      className="elements__demoForm"
      style={{
        backgroundColor: backgroundColor.toHexString(),
        color: foregroundColor.toHexString(),
      }}
    >
      <label htmlFor="inputElement">Label</label>
      <div className="elements__demoInput">
        <input
          type="text"
          name="inputElement"
          id="inputElement"
          disabled={true}
          style={{
            borderColor: foregroundColor.toHexString(),
          }}
        />
      </div>
    </form>
  );
};

const Validation = ({ requirement, message, children }) => {
  const { contrastRatio, colorPickerBackground } = useContext(AppContext);

  return (
    <>
      <div className="elements__validation-outer">
        {children}
        <p
          className="elements__validation"
          style={{
            color: tinycolor
              .mostReadable(colorPickerBackground, ["#16161a", "#ffffff"])
              .toHexString(),
          }}
        >
          <span
            className={`elements__validation-icon${
              contrastRatio > requirement ? " pass" : " fail"
            }`}
          >
            {contrastRatio > requirement ? <FiCheck /> : <FiX />}
          </span>
          {contrastRatio > requirement ? "Passes " : "Fails "}
          {message}
        </p>
      </div>
    </>
  );
};

export default Elements;
