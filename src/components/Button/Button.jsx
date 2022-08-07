import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default ({
  children,
  variant,
  color,
  element,
  margin = '0',
  padding = '8px 10px',
  sx,
  ...otherProps
}) => {
  return (
    <div style={{ padding, margin }}>
      {element === 'link' ? (
        <Link {...otherProps}>
          <Typography variant={variant} color={color}>
            {children}
          </Typography>
        </Link>
      ) : element === 'nav-link' ? (
        <NavLink {...otherProps}>
          <Typography variant={variant} color={color}>
            {children}
          </Typography>
        </NavLink>
      ) : (
        <Button
          fullWidth
          variant={variant}
          color={color}
          sx={{ padding, margin, ...sx }}
          {...otherProps}
        >
          {children}
        </Button>
      )}
    </div>
  );
};
