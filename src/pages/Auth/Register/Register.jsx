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
              Sign up
            </Typography>
            <Button element="link" color="primary" to={constants.urls.LOGIN}>
              Already have an account?
            </Button>
          </div>
          <Input
            type="text"
            name="first_name"
            label="First Name"
            // helperText="Incorrect entry."
          />
          <Input
            type="text"
            name="last_name"
            label="Last Name"
            // helperText="Incorrect entry."
          />
          <Input
            type="text"
            name="email"
            label="Email Address"
            // helperText="Incorrect entry."
          />
          <Input
            type="password"
            name="password"
            label="Password"
            // helperText="Incorrect entry."
          />
          <Input
            type="password"
            name="confirm_password"
            label="Confirm Password"
            // helperText="Incorrect entry."
          />
          <Button variant="contained">Sign up</Button>
        </Card>
      </Grid>
    </Grid>
  );
};
