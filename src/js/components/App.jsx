import React, { useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import { AppContext } from "../store";
import Form from "./Form";
import Text from "./Text";

const App = () => {
  const [backgroundColor, setBackgroundColor] = useState(null);
  const [foregroundColor, setForegroundColor] = useState();

  const [contrastRatio, setContrastRatio] = useState("");

  const context = {
    backgroundColor,
    setBackgroundColor,
    foregroundColor,
    setForegroundColor,
    contrastRatio,
    setContrastRatio,
  };

  useEffect(() => {
    setBackgroundColor(tinycolor("#ffffff"));
    setForegroundColor(tinycolor("#757575"));
    setContrastRatio(tinycolor.readability(backgroundColor, foregroundColor));
  }, []);

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
