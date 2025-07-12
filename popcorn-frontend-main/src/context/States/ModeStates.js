import React, { useState } from "react";
import ModeContext from "../Contexts/ModeContext";

const ModeStates = (props) => {
  const [checked, setChecked] = useState(false);
  return (
    <ModeContext.Provider value={{ checked, setChecked }}>
      {props.children}
    </ModeContext.Provider>
  );
};

export default ModeStates;
