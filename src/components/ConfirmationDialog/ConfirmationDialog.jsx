import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmationDialog({
  titleText = "Confirmation Required",
  warningText = "Are you sure you want to continue?",
  moveForward = () => {},
  fullWidth = true,
  show = false,
  setShow
}) {

  const handleClose = () => {
    setShow(false);
  };

  const agree = () => {
    moveForward()
    setShow(false);
  };

  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        fullWidth={fullWidth}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {titleText}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {warningText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={agree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}