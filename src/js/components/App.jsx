import React, { useState } from "react";
import { AppContext } from "../store";
import Form from "./Form";
import Text from "./Text";

const App = () => {
  const [backgroundColor, setBackgroundColor] = useState({
    rgba: {},
    luminance: 0,
  });
  const [foregroundColor, setForegroundColor] = useState({
    rgba: {},
    luminance: 0,
  });

  const [contrastRatio, setContrastRatio] = useState("");

  const context = {
    backgroundColor,
    setBackgroundColor,
    foregroundColor,
    setForegroundColor,
    contrastRatio,
    setContrastRatio,
  };

  return (
    <AppContext.Provider value={context}>
      <Form />
      <div className="contrast_checker__elements">
        <Text />
      </div>
    </AppContext.Provider>
  );
};

export default App;
