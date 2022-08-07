import * as React from 'react';
import Card from '@mui/material/Card';

export default ({ padding = '25px 10px', margin = '10px', children, sx, ...otherProps }) => {
  return (
    <Card sx={{ padding, margin, ...sx }} {...otherProps}>
      {children}
    </Card>
  );
};
