import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

import Heading from "../../components/Heading";
import Table from "../../components/Table";
import useHttpClient from "../../hooks/http-client";
import constants from "../../constants";
import AddClientModal from "./Detail/AddClientModal";
import { setClientsList } from "../../redux/slices/client-slice";
import Button from "../../components/Button";

const header = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    valueGetter: (params) => params.row?.name,
  },
  {
    field: "abbreviation",
    headerName: "Abbreviation",
    flex: 1,
    valueGetter: (params) => params.row?.abbreviation,
  },
  {
    field: "id",
    headerName: "Action",
    type: "number",
    flex: 1,
    renderCell: (params) => (
      <Button
        element="nav-link"
        to={constants.urls.CLIENT_DETAIL(params.row?.id)}
        variant="primary"
      >
        <VisibilityIcon color="grey" />
      </Button>
    ),
  },
];

const ClientList = () => {
  const dispatch = useDispatch();
  const { request } = useHttpClient();
  const { role } = useSelector((state) => state.user);
  const clients = useSelector((state) => state.client.clientList);

  const [showAddClientModal, setShowAddClientModal] = useState(false);

  const getClientsList = async () => {
    const { data } = await request.get(constants.apis.CLIENT_LIST());
    dispatch(setClientsList(data));
  };

  useEffect(() => {
    getClientsList();
  }, []);

  return (
    <Fragment>
      {showAddClientModal && (
        <AddClientModal
          show={showAddClientModal}
          setShow={setShowAddClientModal}
          getClientsList={getClientsList}
        />
      )}
      <Table
        height="800px"
        columns={header}
        rows={clients}
        rowsPerPageOptions={[10]}
        pageSize={10}
        title={
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Heading margin="1rem 0 0.4rem">Client List</Heading>
            {!role?.isEmployee && (
              <Button
                variant="contained"
                size="small"
                onClick={() => setShowAddClientModal(true)}
              >
                <AddTwoToneIcon />
                &nbsp;Add new client&nbsp;&nbsp;
              </Button>
            )}
          </div>
        }
      />
    </Fragment>
  );
};

export default ClientList;
