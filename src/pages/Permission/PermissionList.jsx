import React from 'react';
import Heading from '../../components/Heading';
import Table from '../../components/Table';

export default () => {
  return (
    <Table
      height="800px"
      rowsPerPageOptions={[10]}
      pageSize={10}
      title={<Heading>Firms List</Heading>}
    />
  );
};
