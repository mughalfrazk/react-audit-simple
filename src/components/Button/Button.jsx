import React from 'react';
import { Button, Typography, CircularProgress, IconButton  } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';

export default ({
  children,
  variant,
  color,
  element,
  loading = false,
  size,
  onClick,
  margin = '0',
  padding = '8px 10px',
  sx,
  disabled,
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
      ) : element === 'icon' ? (
        <IconButton 
          disabled={loading}
          variant={variant}
          color={color}
          size={"small"}
          onClick={onClick}
          sx={{ padding, margin, ...sx }}
          {...otherProps}
        >
          {loading ? <CircularProgress color='white' size={25} /> : children}
        </IconButton>
      ) : (
        <Button
          fullWidth
          disabled={disabled || loading}
          variant={variant}
          color={color}
          size={size}
          onClick={onClick}
          sx={{ padding, margin, ...sx }}
          {...otherProps}
        >
          {loading ? <CircularProgress color='white' size={25} /> : children}
        </Button>
      )}
    </div>
  );
};
