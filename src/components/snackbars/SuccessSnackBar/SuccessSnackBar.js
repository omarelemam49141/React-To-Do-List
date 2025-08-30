import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SuccessSnackBar({ isOpen, closeHandler, message }) {
  const handleClose = (event, reason) => {
    closeHandler();
  };

  return (
    <div>
      <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
