import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Heading from '../../components/Heading';
import Table from '../../components/Table';
import useHttpClient from '../../hooks/http-client';
import constants from '../../constants';
import { setFirmsList } from '../../redux/slices/firm-slice';
import Button from '../../components/Button';

const header = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'workspace', headerName: 'Workspace', flex: 1 },
  {
    field: 'abbreviation',
    headerName: 'Abbreviation',
    type: 'number',
    flex: 1,
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
        <VisibilityIcon color='grey' />
      </Button>
    ),
  },
];

const FirmList = () => {
  const dispatch = useDispatch();
  const firms = useSelector((state) => state.firm.firmList);

  const { request } = useHttpClient();

  const getFirmsList = async () => {
    const { data } = await request.get(constants.apis.FIRM_LIST);
    dispatch(setFirmsList(data));
  };

  useEffect(() => {getFirmsList()}, []);

  return (
    <Table
      height="800px"
      columns={header}
      rows={firms}
      rowsPerPageOptions={[10]}
      pageSize={10}
      title={<Heading>Firms</Heading>}
    />
  );
};

export default FirmList;