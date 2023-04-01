import React, { useEffect } from 'react';

import Card from '../../../components/Card';
import Grid from '../../../components/Grid';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Typography from '../../../components/Typography';
import constants from '../../../constants';

export default ({ isLoading, formik }) => {
  return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100%"
        spacing="2"
      >
        <Grid item lg={3} md={6} sm={12}>
          <form onSubmit={formik.handleSubmit}>
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
                type="email"
                name="email"
                label="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.email)}
                helperText={formik.errors.email}
              />
              <Input
                type="password"
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.password)}
                helperText={formik.errors.password}
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
              <Button type="submit" variant="contained" loading={isLoading}>Login</Button>
            </Card>
          </form>
        </Grid>
      </Grid>
  );
};
