import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Heading from '../../components/Heading';
import Table from '../../components/Table';
import useHttpClient from '../../hooks/http-client';
import constants from '../../constants';
import { setClientsList } from '../../redux/slices/client-slice';
import Button from '../../components/Button';

const header = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    valueGetter: (params) => params.row?.name,
  },
  {
    field: 'abbreviation',
    headerName: 'Abbreviation',
    flex: 1,
    valueGetter: (params) => params.row?.abbreviation,
  },
  {
    field: 'id',
    headerName: 'Action',
    type: 'number',
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
  const clients = useSelector((state) => state.client.clientList);

  const { request } = useHttpClient();

  const getClientsList = async () => {
    const { data } = await request.get(constants.apis.CLIENT_LIST());
    dispatch(setClientsList(data));
  };

  useEffect(() => {
    getClientsList();
  }, []);

  return (
    <Table
      height="800px"
      columns={header}
      rows={clients}
      rowsPerPageOptions={[10]}
      pageSize={10}
      title={<Heading>Clients</Heading>}
    />
  );
};

export default ClientList;
