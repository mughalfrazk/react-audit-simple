import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default ({
  element,
  margin = "12px 0 15px",
  padding = "0 0",
  width = "100%",
  sx,
  helperText,
  children,
  ...otherProps
}) => {
  return (
    <div style={{ padding }}>
      {element === "option" ? (
        <MenuItem {...otherProps}>{children}</MenuItem>
      ) : element === "select" ? (
        <FormControl fullWidth={true} sx={{ width, margin, ...sx }}>
          <InputLabel error={otherProps.error}>{otherProps.label}</InputLabel>
          <Select fullWidth={true} {...otherProps}>
            <MenuItem value="">{otherProps.label}</MenuItem>
            {children}
          </Select>
          <FormHelperText sx={{ color: "red" }}>{helperText}</FormHelperText>
        </FormControl>
      ) : element === "date" ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={otherProps.value}
              onChange={otherProps.onChange}
              {...otherProps}
              label={otherProps.label}
            />
          </DemoContainer>
        </LocalizationProvider>
      ) : (
        <TextField
          sx={{ width, margin, ...sx }}
          {...otherProps}
          value={otherProps.value}
          onChange={otherProps.onChange}
          helperText={helperText}
        />
      )}
    </div>
  );
};
