import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

import useHttpClient from "../../../hooks/http-client";
import Table from "../../../components/Table";
import Heading from "../../../components/Heading";
import constants from "../../../constants";
import { setEmployeePermissions } from "../../../redux/slices/employee-slice";
import Button from "../../../components/Button";
import AddPermissionModal from "./AddPermissionModal";

const permissionHeader = [
  // { field: 'id', headerName: 'ID', flex: 1 },
  {
    field: "client",
    headerName: "Client",
    flex: 1,
    valueGetter: (params) => params.row?.company?.name,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    renderCell: (params) => (
      <div>
        <p className="m-0 me-1">{params.row?.action?.name}</p>
        <i className="text-secondary">
          <small>{params.row?.action?.description}</small>
        </i>
      </div>
    ),
  },
  {
    field: "id",
    headerName: "Action",
    type: "number",
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

const EmployeePermissionList = ({
  role,
  employeeId,
  firmId,
  permissionsList,
}) => {
  const dispatch = useDispatch();
  const { request } = useHttpClient();

  const [showAddPermission, setShowAddPermission] = useState(false);

  const getEmployeePermissions = async (id, firm) => {
    const { data } = await request.get(
      constants.apis.CLIENT_ASSIGNMENT_LIST(id, firm)
    );
    dispatch(setEmployeePermissions(data));
  };

  useEffect(() => {
    if (role?.isSuperAdmin) {
      employeeId && firmId && getEmployeePermissions(employeeId, firmId);
    } else {
      employeeId && getEmployeePermissions(employeeId, null);
    }
  }, [employeeId, firmId]);

  return (
    <Fragment>
      {!role?.isEmployee && showAddPermission && (
        <AddPermissionModal
          show={showAddPermission}
          setShow={setShowAddPermission}
          reloadPermissions={() => getEmployeePermissions(employeeId, firmId)}
        />
      )}
      <Table
        columns={permissionHeader}
        rows={permissionsList}
        height={600}
        pageSize={10}
        title={
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Heading margin="1rem 0 0.4rem">Employee Permissions</Heading>
            {!role?.isEmployee && (
              <Button
                variant="contained"
                size="small"
                onClick={() => setShowAddPermission(true)}
              >
                <AddTwoToneIcon />
                &nbsp;Add new permission&nbsp;&nbsp;
              </Button>
            )}
          </div>
        }
      />
    </Fragment>
  );
};

export default EmployeePermissionList;
