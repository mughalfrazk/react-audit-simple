import React, { Fragment } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Card from '../Card';
import { Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

const d_columns = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'firstName', headerName: 'First name', flex: 1 },
  { field: 'lastName', headerName: 'Last name', flex: 1 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    flex: 1
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 1,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const d_rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default ({
  height = 400,
  width = '100%',
  pageSize = 5,
  rowsPerPageOptions = [10],
  columns = d_columns,
  rows = d_rows,
  title,
  border,
  backgroundColor = 'white'
}) => {
  return (
    <Fragment>
      {title}
      <div style={{ height, width, backgroundColor }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={rowsPerPageOptions}
          checkboxSelection
          disableSelectionOnClick
          sx={{ border }}
        />
      </div>
    </Fragment>
  );
};
