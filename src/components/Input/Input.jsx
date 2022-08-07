import { TextField } from '@mui/material';

export default ({
  margin = '12px 0 15px',
  padding = '0 10px',
  width = '100%',
  sx,
  ...otherProps
}) => {
  return (
    <div style={{ padding }}>
      <TextField sx={{ width, margin, ...sx }} {...otherProps} />
    </div>
  );
};
