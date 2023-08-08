import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Button from '../Button';

export default ({
  titleText = 'Confirmation Required',
  saveText = 'Save',
  submitType = 'button',
  submitLoading = false,
  submitHandler = () => {},
  children,
  type,
  moveForward = () => {},
  show = false,
  setShow,
  ...otherProps
}) => {
  const handleClose = () => {
    setShow(false);
  };

  const agree = () => {
    moveForward();
  };

  const wrapper = (wrapperType, content) => {
    return wrapperType === 'form' ? (
      <form onSubmit={submitHandler}>{content}</form>
    ) : (
      content
    );
  };

  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        {...otherProps}
      >
        {wrapper(
          type,
          <React.Fragment>
            <DialogTitle id="dialog-title">{titleText}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                type={submitType}
                variant="contained"
                loading={submitLoading === "yes" ? true : false}
                onClick={agree} 
                autoFocus
              >
                {saveText}
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    </div>
  );
};
