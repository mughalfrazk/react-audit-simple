import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

export default ({
  element,
  margin = '12px 0 15px',
  padding = '0 10px',
  width = '100%',
  sx,
  helperText,
  children,
  ...otherProps
}) => {
  return (
    <div style={{ padding }}>
      {element === 'option' ? (
        <MenuItem {...otherProps}>{children}</MenuItem>
      ) : element === 'select' ? (
        <FormControl fullWidth={true} sx={{ width, margin, ...sx }}>
          <InputLabel error={otherProps.error}>{otherProps.label}</InputLabel>
          <Select fullWidth={true} {...otherProps}>
            <MenuItem value="">{otherProps.label}</MenuItem>
            {children}
          </Select>
          <FormHelperText sx={{ color: 'red' }}>{helperText}</FormHelperText>
        </FormControl>
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
