import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';

import useHttpClient from '../../../hooks/http-client';
import constants from '../../../constants';
import { setFirmDetail } from '../../../redux/slices/firm-slice';
import Heading from '../../../components/Heading';
import Table from '../../../components/Table';
import Button from '../../../components/Button';
import Tabs from '../../../components/Tabs';
import InfoList from '../../../components/InfoList/InfoList';
import { testPlaceHolder } from '../../../services/utils/functions';

const clientHeader = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    valueGetter: (params) => params.row?.client?.name,
  },
  {
    field: 'abbreviation',
    headerName: 'Abbreviation',
    flex: 1,
    valueGetter: (params) => params.row?.client?.abbreviation,
  },
  {
    field: 'id',
    headerName: 'Action',
    type: 'number',
    flex: 1,
    renderCell: (params) => (
      <Button
        element="nav-link"
        to={constants.urls.CLIENT_DETAIL(params.row?.client?.id)}
        variant="primary"
      >
        <VisibilityIcon color="grey" />
      </Button>
    ),
  },
];

const employeeHeader = [
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
        to={constants.urls.EMPLOYEE_DETAIL(params.row?.id)}
        variant="primary"
      >
        <VisibilityIcon color="grey" />
      </Button>
    ),
  },
];

export default () => {
  const { id } = useParams();
  const { request } = useHttpClient();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.firm.selectedFirm);
  const [infoList, setInfoList] = useState([]);

  const tabs = [
    {
      name: "Clients",
      view: <Table
        columns={clientHeader}
        rows={detail?.firms}
        rowsPerPageOptions={[10]}
        pageSize={10}
      />
    },
    {
      name: "Employees",
      view: <Table
        columns={employeeHeader}
        rows={detail?.employees}
        rowsPerPageOptions={[10]}
        pageSize={10}
      />
    }
  ]

  const getFirmDetail = async (id) => {
    const { data } = await request.get(constants.apis.FIRM_DETAIL(id));
    dispatch(setFirmDetail(data));
  };

  useEffect(() => {
    id && getFirmDetail(id);
  }, [id]);

  useEffect(() => {
    if (!!detail) setInfoList([
      {
        key: 'Name',
        value: testPlaceHolder(detail?.name)
      },
      {
        key: 'Abbreviation',
        value: testPlaceHolder(detail?.abbreviation)
      },
      {
        key: 'Workspace',
        value: testPlaceHolder(detail?.workspace)
      },
    ])
  }, [detail])

  return (
    <Fragment>
      <Heading>Firm Detail</Heading>
      <InfoList data={infoList} />
      <Tabs tabs={tabs} />
    </Fragment>
  );
};
