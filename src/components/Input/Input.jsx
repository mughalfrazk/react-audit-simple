import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default ({
  element,
  margin = '12px 0 15px',
  padding = '0 10px',
  width = '100%',
  sx,
  helperText,
  ...otherProps
}) => {
  return (
    <div style={{ padding }}>
      {element === 'select' ? (
        <Select>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      ) : (
        <TextField
          sx={{ width, margin, ...sx }}
          {...otherProps}
          helperText={helperText}
        />
      )}
    </div>
  );
};
