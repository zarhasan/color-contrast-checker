import React, { useContext } from "react";
import { AppContext } from "../store";
import { FiX, FiCheck, FiExternalLink, FiSave, FiShare2 } from "react-icons/fi";
import tinycolor from "tinycolor2";

const DemoContent = () => {
  const { backgroundColor, foregroundColor } = useContext(AppContext);

  return (
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
  );
};

const Validation = ({ requirement, message, children }) => {
  const { contrastRatio, backgroundColor } = useContext(AppContext);

  return (
    <div
      className={`form__demo-validation${
        contrastRatio > requirement ? " pass" : " fail"
      }`}
    >
      {children}
    </div>
  );
};

export default DemoContent;
