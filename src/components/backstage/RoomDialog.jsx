import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteDialog = ({ open, handleClose, deleteOrder }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <div className="p-4">
          <DialogContentText id="alert-dialog-description">
            <span className="text-2xl">確定要刪除 ?</span>
          </DialogContentText>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button onClick={deleteOrder} autoFocus>
          刪除
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
