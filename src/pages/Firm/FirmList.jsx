import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import Heading from "../../components/Heading";
import Table from "../../components/Table";
import useHttpClient from "../../hooks/http-client";
import constants from "../../constants";
import { setFirmsList } from "../../redux/slices/firm-slice";
import Button from "../../components/Button";
import AddFirmModal from "./Detail/AddFirmModal";

const header = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "workspace", headerName: "Workspace", flex: 1 },
  {
    field: "abbreviation",
    headerName: "Abbreviation",
    type: "number",
    flex: 1,
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

const FirmList = () => {
  const dispatch = useDispatch();
  const { request } = useHttpClient();
  const firms = useSelector((state) => state.firm.firmList);
  const { role } = useSelector(state => state.user);

  const [showAddFirmModal, setShowAddFirmModal] = useState(false);

  const getFirmsList = async () => {
    const { data } = await request.get(constants.apis.FIRM_LIST);
    dispatch(setFirmsList(data));
  };

  useEffect(() => {
    getFirmsList();
  }, []);

  return (
    <Fragment>
      {showAddFirmModal && <AddFirmModal show={showAddFirmModal} setShow={setShowAddFirmModal} />}
      <Table
        height="800px"
        columns={header}
        rows={firms}
        rowsPerPageOptions={[10]}
        pageSize={10}
        title={
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Heading margin="1rem 0 0.4rem">Firms List</Heading>
            {!role?.isEmployee && (
              <Button
                variant="contained"
                size="small"
                onClick={() => setShowAddFirmModal(true)}
              >
                <AddTwoToneIcon />
                &nbsp;Add new firm&nbsp;&nbsp;
              </Button>
            )}
          </div>
        }
      />
    </Fragment>
  );
};

export default FirmList;
