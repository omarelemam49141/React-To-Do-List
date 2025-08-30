import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditToDoItemDialog({
  isOpen,
  itemTitle,
  itemDescription,
  setOpenDialogStateHandler,
  confirmEditHandler,
}) {
  //states
  let [itemTitleState, setItemTitleState] = React.useState(itemTitle);
  let [itemDescriptionState, setItemDescriptionState] =
    React.useState(itemDescription);

  const handleClose = () => {
    setOpenDialogStateHandler(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    confirmEditHandler(itemTitleState, itemDescriptionState);
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog open={isOpen} onClose={handleClose} dir="rtl">
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              value={itemTitleState}
              onChange={(e) => setItemTitleState(e.target.value)}
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="عنوان المهمة"
              type="text"
              fullWidth
              variant="standard"
            />

            <TextField
              value={itemDescriptionState}
              onChange={(e) => setItemDescriptionState(e.target.value)}
              autoFocus
              required
              margin="dense"
              id="description"
              name="description"
              label="وصف المهمة"
              type="text"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إغلاق</Button>
          <Button type="submit" form="subscription-form">
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
