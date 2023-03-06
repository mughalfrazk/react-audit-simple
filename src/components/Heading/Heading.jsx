import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

export default ({
  padding = '0 0 0',
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
      <Divider sx={{ marginBottom: '10px' }} />
    </Typography>
  );
};
