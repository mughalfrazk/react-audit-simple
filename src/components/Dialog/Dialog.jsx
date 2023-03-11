import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default ({
  titleText = "Confirmation Required",
  children,
  moveForward = () => {},
  show = false,
  setShow,
  ...otherProps
}) => {

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
        {...otherProps}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {titleText}
        </DialogTitle>
        <DialogContent>
          {children}
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