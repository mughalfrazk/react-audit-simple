import { Fragment, useEffect } from 'react';
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
        to={constants.urls.FIRM_DETAIL(0)}
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
        to={constants.urls.FIRM_DETAIL(0)}
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

  return (
    <Fragment>
      <Heading>Firm Detail</Heading>
      <div className="row align-items-baseline">
        <div className="col-sm-2 text-end">
          <h6 className="m-0">Name:</h6>
        </div>
        <div className="col-sm-10">
          <h5>{detail?.name}</h5>
        </div>
        <div className="col-sm-2 text-end">
          <h6 className="m-0">Abbreviation:</h6>
        </div>
        <div className="col-sm-10">
          <h5>{detail?.abbreviation}</h5>
        </div>
        <div className="col-sm-2 text-end">
          <h6 className="m-0">Workspace:</h6>
        </div>
        <div className="col-sm-10">
          <h5>{detail?.workspace}</h5>
        </div>
      </div>
      <hr />
      <Tabs tabs={tabs} />
    </Fragment>
  );
};
