import React from 'react';

import Card from '../../../components/Card';
import Grid from '../../../components/Grid';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Typography from '../../../components/Typography';
import constants from '../../../constants';

export default () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height="100%"
      spacing="2"
    >
      <Grid item md={3} sm={12}>
        <Card>
          <div className="d-flex justify-content-between align-items-center px-2 pb-3">
            <Typography variant="h5" padding="0" sx={{ fontWeight: 'bold' }}>
              Login
            </Typography>
            <Button element="link" color="primary" to={constants.urls.REGISTER}>
              Don't have an account?
            </Button>
          </div>
          <Input
            type="text"
            name="email"
            label="Email Address"
            defaultValue="Hello World"
          />
          <Input
            type="password"
            name="password"
            label="Password"
            defaultValue="Hello World"
          />
          <div className="d-flex justify-content-end px-2">
            <Button
              element="link"
              color="primary"
              to={constants.urls.FORGOT_PASSWORD}
            >
              <small>Forgot password?</small>
            </Button>
          </div>
          <Button variant="contained">Login</Button>
        </Card>
      </Grid>
    </Grid>
  );
};
