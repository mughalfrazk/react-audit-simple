import { Button } from '@mui/material';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import constants from '../../../constants';

export default () => {
  return (
    <Fragment>
      <h1>404</h1>
      <Link to={constants.urls.INDEX}>
        <Button variant="contained">Go Back</Button>
      </Link>
    </Fragment>
  );
};
