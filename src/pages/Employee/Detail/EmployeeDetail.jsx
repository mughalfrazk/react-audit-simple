import React, { useState, useEffect, Fragment, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import useHttpClient from '../../../hooks/http-client';
import { setEmployeeDetail } from '../../../redux/slices/employee-slice';
import constants from '../../../constants';
import { testPlaceHolder } from '../../../services/utils/functions';
import InfoList from '../../../components/InfoList/InfoList';
import Heading from '../../../components/Heading';
import EmployeePermissionList from './EmployeePermissionList';

const EmployeeDetail = () => {
  const { id } = useParams();
  const { request } = useHttpClient();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.user);
  const { selectedEmployee, employeePermissions } = useSelector(
    (state) => state.employee
  );
  const [infoList, setInfoList] = useState([]);

  const getEmployeesDetail = async (id) => {
    const { data } = await request.get(constants.apis.EMPLOYEE_DETAIL(id));
    dispatch(setEmployeeDetail(data));
  };

  const employeePermissionComponent = useMemo(() => (!!selectedEmployee && selectedEmployee.role.identifier === constants.roles.EMPLOYEE) && (
    <EmployeePermissionList
      employeeId={id}
      role={role}
      firmId={selectedEmployee?.company?.id}
      permissionsList={employeePermissions}
    />
  ), [selectedEmployee, employeePermissions])

  useEffect(() => {
    id && getEmployeesDetail(id);
  }, [id]);

  useEffect(() => {
    if (!!selectedEmployee)
      setInfoList([
        {
          key: 'Employee no',
          value: testPlaceHolder(selectedEmployee?.employee_no),
        },
        {
          key: 'Name',
          value: testPlaceHolder(
            `${selectedEmployee?.first_name} ${selectedEmployee?.last_name}`
          ),
        },
        {
          key: 'Email',
          value: testPlaceHolder(selectedEmployee?.email),
        },
        {
          key: 'Role',
          value: testPlaceHolder(selectedEmployee?.role?.name),
        },
      ]);
  }, [selectedEmployee]);

  return (
    <Fragment>
      <Heading>Employee Detail</Heading>
      <InfoList data={infoList} />
      {employeePermissionComponent}
    </Fragment>
  );
};

export default EmployeeDetail;
