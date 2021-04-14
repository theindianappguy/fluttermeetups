import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { SnackbarContext } from "../../contexts/global/snackbar-context";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomSnackbar() {
  //------------------------------------
  // Constants Hooks
  const [showSnack, setShowSnack] = useContext(SnackbarContext).showSnack;
  const [snackLabel, setSnackLabel] = useContext(SnackbarContext).snackLabel;
  const [severity, setSeverity] = useContext(SnackbarContext).severity;

  return (
    <div>
      <Snackbar
        anchorOrigin={("top", "right")}
        open={showSnack}
        key={"top" + "center"}
      >
        <Alert onClose={() => setShowSnack(false)} severity={severity}>
          {snackLabel}
        </Alert>
      </Snackbar>
    </div>
  );
}
