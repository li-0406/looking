import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Toast = ({ open, handleClose, text, state }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        color={state}
        severity="success"
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
