import React, { Fragment } from 'react';

import Chart from '../../components/Chart';
import Grid from '../../components/Grid';
import StatCard from '../../components/StatCard';
import Heading from '../../components/Heading';

const Dashboard = () => {
  return (
    <Fragment>
      <Heading>Statistics</Heading>
      <Grid container spacing="10" paddingBottom="20px">
        <Grid item md={3}>
          <StatCard
            title="Total Page Views"
            text="4,42,236"
            subText="You made an extra 35,000 this year"
            buttonText="Learn More"
            onClick={() => {}}
          />
        </Grid>
        <Grid item md={3}>
          <StatCard
            title="Total Users"
            text="78,250"
            subText="You made an extra 8,900 this year"
            buttonText="Learn More"
            onClick={() => {}}
          />
        </Grid>
        <Grid item md={3}>
          <StatCard
            title="Total Order"
            text="18,800"
            subText="You made an extra 1,943 this year"
            buttonText="Learn More"
            onClick={() => {}}
          />
        </Grid>
        <Grid item md={3}>
          <StatCard
            title="Total Sales"
            text="$35,078"
            subText="You made an extra $20,395 this year"
            buttonText="Learn More"
            onClick={() => {}}
          />
        </Grid>
      </Grid>

      <Heading>Graphical Views</Heading>
      <Grid container spacing="10">
        <Grid item md={8}>
          <Chart />
        </Grid>
        <Grid item md={4}>
          <Chart type="bar" />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Dashboard;
