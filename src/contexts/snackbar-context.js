import React, { useState, createContext } from "react";

export const SnackbarContext = createContext();

export const SnackbarContextProvider = (props) => {
  //------------------------------------
  // Constants Hooks
  const [showSnack, setShowSnack] = useState(false);
  const [snackLabel, setSnackLabel] = useState("");
  const [severity, setSeverity] = useState("info"); // "error" | "warning" | "info" | "success"

  return (
    <SnackbarContext.Provider
      value={{
        showSnack: [showSnack, setShowSnack],
        snackLabel: [snackLabel, setSnackLabel],
        severity: [severity, setSeverity],
      }}
    >
      {props.children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
