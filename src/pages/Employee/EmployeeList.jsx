import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import Heading from '../../components/Heading';
import Table from '../../components/Table';
import useHttpClient from '../../hooks/http-client';
import constants from '../../constants';
import Button from '../../components/Button';
import AddNewEmployeeModal from './AddNewEmployeeModal';
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
    valueGetter: (params) => `${params.row?.first_name} ${params.row?.last_name}`,
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
        to={constants.urls.EMPLOYEE_DETAIL(params.row?.id)}
        variant="primary"
      >
        <VisibilityIcon color="grey" />
      </Button>
    ),
  },
];

const EmployeeList = () => {
  const dispatch = useDispatch();
  const [showNewEmployeeForm, setShowNewEmployeeForm] = useState(false);
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
    <Fragment>
      {showNewEmployeeForm && <AddNewEmployeeModal show={showNewEmployeeForm} setShow={setShowNewEmployeeForm} />}
      <Table
        height="800px"
        columns={header}
        rows={employees}
        rowsPerPageOptions={[10]}
        pageSize={10}
        title={
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Heading margin="1rem 0 0.4rem">Employees</Heading>
            <Button variant="contained" size="small" onClick={() => setShowNewEmployeeForm(true)}>
              <AddTwoToneIcon />
              &nbsp;Add new employee&nbsp;&nbsp;
            </Button>
          </div>
        }
      />
    </Fragment>

  );
};

export default EmployeeList;
