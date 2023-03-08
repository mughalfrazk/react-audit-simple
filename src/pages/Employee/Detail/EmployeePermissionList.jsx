import React, { Fragment, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';

import useHttpClient from '../../../hooks/http-client';
import Table from '../../../components/Table';
import Heading from '../../../components/Heading';
import constants from '../../../constants';
import { useDispatch } from 'react-redux';
import { setEmployeePermissions } from '../../../redux/slices/employee-slice';
import Button from '../../../components/Button';

const permissionHeader = [
  // { field: 'id', headerName: 'ID', flex: 1 },
  {
    field: 'client',
    headerName: 'Client',
    flex: 1,
    valueGetter: (params) => params.row?.company?.name,
  },
  {
    field: 'action',
    headerName: 'Action',
    flex: 1,
    renderCell: (params) => (
      <div>
        <p className='m-0 me-1'>{params.row?.action?.name}</p>
        <i className='text-secondary'><small>{params.row?.action?.description}</small></i>
      </div>
    ),
  },
  {
    field: 'id',
    headerName: 'Action',
    type: 'number',
    flex: 1,
    renderCell: (params) => (
      <Button
        element="nav-link"
        to={constants.urls.FIRM_DETAIL(params.row.id)}
        variant="primary"
      >
        <VisibilityIcon color="grey" />
      </Button>
    ),
  },
];

const EmployeePermissionList = ({ employeeId, permissionsList }) => {
  const dispatch = useDispatch();
  const { request } = useHttpClient();

  const getEmployeePermissions = async (id) => {
    const { data } = await request.get(
      constants.apis.CLIENT_ASSIGNMENT_LIST(id)
    );
    dispatch(setEmployeePermissions(data));
  };

  useEffect(() => {
    employeeId && getEmployeePermissions(employeeId);
  }, [employeeId]);

  return (
    <Table
      columns={permissionHeader}
      rows={permissionsList}
      title={<Heading margin="1rem 0 0.4rem">Employee Permissions</Heading>}
    />
  );
};

export default EmployeePermissionList;
