import { Typography } from '@mui/material';

export default ({
  padding = '0 0 10px',
  margin = '0',
  sx,
  children,
  ...otherProps
}) => {
  return (
    <Typography
      variant="h6"
      fontWeight={500}
      sx={{ margin, padding, ...sx }}
      {...otherProps}
    >
      {children}
    </Typography>
  );
};
