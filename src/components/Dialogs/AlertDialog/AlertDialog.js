import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
  isOpen,
  dialogTitle,
  dialogDescription,
  agreeText,
  disagreeText,
  setOpenDeleteDialogState,
  deleteItemFromListHandler,
  itemId,
}) {
  const handleClose = () => {
    setOpenDeleteDialogState(false);
  };

  return (
    <React.Fragment>
      <Dialog
        dir="rtl"
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{disagreeText}</Button>
          <Button onClick={() => deleteItemFromListHandler(itemId)} autoFocus>
            {agreeText}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
