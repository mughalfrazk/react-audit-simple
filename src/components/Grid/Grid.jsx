import { Grid } from '@mui/material';

export default ({ width = '100%', sx, children, ...otherProps }) => {
  return (
    <Grid sx={{ width, ...sx }} {...otherProps}>
      {children}
    </Grid>
  );
};
