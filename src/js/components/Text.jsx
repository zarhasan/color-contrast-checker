import React, { useContext } from "react";
import { AppContext } from "../store";

const Text = () => {
  const { backgroundColor, foregroundColor } = useContext(AppContext);

  const brgba = backgroundColor.rgba;
  const frgba = foregroundColor.rgba;

  return (
    <div
      className="contrast_checker__text"
      style={{
        backgroundColor: `rgba(${brgba.r}, ${brgba.g}, ${brgba.b}, ${brgba.a})`,
        color: `rgba(${frgba.r}, ${frgba.g}, ${frgba.b}, ${frgba.a})`,
      }}
    >
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 3</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
      <p>Paragraph</p>
    </div>
  );
};

export default Text;
