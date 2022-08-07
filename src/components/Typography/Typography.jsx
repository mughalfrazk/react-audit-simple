import { Typography } from '@mui/material';

export default ({
  padding = '0 10px 20px',
  margin = '0',
  sx,
  children,
  ...otherProps
}) => {
  return (
    <Typography sx={{ margin, padding, ...sx }} {...otherProps}>
      {children}
    </Typography>
  );
};
