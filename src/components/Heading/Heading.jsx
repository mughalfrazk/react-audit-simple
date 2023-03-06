import { Typography } from '@mui/material';

export default ({
  padding = '0 0 0',
  margin = '0 0 0.4rem',
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
      {/* <hr style={{ opacity: 0.1, marginTop: '0.1rem', marginBottom: '0.4rem' }} /> */}
    </Typography>
  );
};
