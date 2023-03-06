import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Heading from '../../components/Heading';
import Table from '../../components/Table';
import useHttpClient from '../../hooks/http-client';
import constants from '../../constants';
import Button from '../../components/Button';
import { setEmployeesList } from '../../redux/slices/employee-slice';

const header = [
  {
    field: 'employee_no',
    headerName: 'Employee no.',
    flex: 1,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
    valueGetter: (params) => params.row?.role?.name,
  },
  {
    field: 'id',
    headerName: 'Action',
    type: 'number',
    flex: 1,
    renderCell: (params) => (
      <Button
        element="nav-link"
        to={constants.urls.FIRM_DETAIL(0)}
        variant="primary"
      >
        <VisibilityIcon color="grey" />
      </Button>
    ),
  },
];

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employeeList);

  const { request } = useHttpClient();

  const getEmployeesList = async () => {
    const { data } = await request.get(constants.apis.EMPLOYEE_LIST());
    dispatch(setEmployeesList(data));
  };

  useEffect(() => {
    getEmployeesList();
  }, []);

  return (
    <Table
      height="800px"
      columns={header}
      rows={employees}
      rowsPerPageOptions={[10]}
      pageSize={10}
      title={<Heading>Employees</Heading>}
    />
  );
};

export default EmployeeList;
