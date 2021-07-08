import React, { useContext } from "react";
import { AppContext } from "../store";
import { FiX, FiCheck } from "react-icons/fi";

const Elements = () => {
  return (
    <div className="contrast_checker__elements">
      <h2 className="contrast_checker__title">Examples</h2>
      <Text />
      <Form />
    </div>
  );
};

const Text = () => {
  const { backgroundColor, foregroundColor } = useContext(AppContext);

  return (
    <div
      className="contrast_checker__text"
      style={{
        backgroundColor: backgroundColor ? backgroundColor.toHexString() : "",
        color: foregroundColor ? foregroundColor.toHexString() : "",
      }}
    >
      <h1>
        Heading 1 <Chip requirement={4.5} />
      </h1>
      <h2>
        Heading 2 <Chip requirement={4.5} />
      </h2>
      <h3>
        Heading 3 <Chip requirement={4.5} />
      </h3>
      <h4>
        Heading 3 <Chip requirement={4.5} />
      </h4>
      <h5>
        Heading 5 <Chip requirement={4.5} />
      </h5>
      <h6>
        Heading 6 <Chip requirement={7.1} />
      </h6>
      <p>
        Paragraph <Chip requirement={7.1} />
      </p>
    </div>
  );
};

const Form = () => {
  const { backgroundColor, foregroundColor } = useContext(AppContext);

  return (
    <form
      className="contrast_checker__demoForm"
      style={{
        backgroundColor: backgroundColor ? backgroundColor.toHexString() : "",
        color: foregroundColor ? foregroundColor.toHexString() : "",
      }}
    >
      <label htmlFor="inputElement">
        Label <Chip requirement={7.1} />
      </label>
      <div className="contrast_checker__demoInput">
        <input
          type="text"
          name="inputElement"
          id="inputElement"
          disabled="true"
          style={{
            borderColor: foregroundColor ? foregroundColor.toHexString() : "",
          }}
        />
        <Chip requirement={3.1} />
      </div>
    </form>
  );
};

const Chip = ({ requirement }) => {
  const { contrastRatio } = useContext(AppContext);

  return (
    <>
      <span
        className={`contrast_checker__chip${
          contrastRatio > requirement ? " pass" : " fail"
        }`}
      >
        {contrastRatio > requirement ? <FiCheck /> : <FiX />}
      </span>
    </>
  );
};

export default Elements;
