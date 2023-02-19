import React, { Fragment } from 'react';
import { Snackbar, SnackbarContent, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@emotion/react';

export default ({ color = "danger", autoHideDuration = 3000, message = "", setClose }) => {
  const theme = useTheme();

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={setClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={!!message}
      autoHideDuration={autoHideDuration}
      onClose={setClose}
    >
      <SnackbarContent sx={{ backgroundColor: theme.palette[color].main }} message={message} action={action} />
    </Snackbar>

}