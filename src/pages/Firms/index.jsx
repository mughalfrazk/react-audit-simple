import React from 'react';
import Heading from '../../components/Heading';
import Table from '../../components/Table';

const Firms = () => {
  return (
    <Table
      height="800px"
      rowsPerPageOptions={[10]}
      pageSize={10}
      title={<Heading>Firms List</Heading>}
    />
  );
};

export default Firms;
