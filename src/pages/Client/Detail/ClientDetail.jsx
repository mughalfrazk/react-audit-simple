import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';

import useHttpClient from '../../../hooks/http-client';
import constants from '../../../constants';
import { setClientDetail } from '../../../redux/slices/client-slice';
import FileManager from '../../../components/FileManager';
import Heading from '../../../components/Heading';
import Table from '../../../components/Table';
import Button from '../../../components/Button';
import Tabs from '../../../components/Tabs';
import InfoList from '../../../components/InfoList/InfoList';
import { testPlaceHolder } from '../../../services/utils/functions';

export default () => {
  const { id } = useParams();
  const { request } = useHttpClient();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.client.selectedClient);
  const [infoList, setInfoList] = useState([]);

  const getFirmDetail = async (id) => {
    const { data } = await request.get(constants.apis.CLIENT_DETAIL(id));
    dispatch(setClientDetail(data));
  };

  useEffect(() => {
    id && getFirmDetail(id);
  }, [id]);

  useEffect(() => {
    if (!!detail) setInfoList([
      {
        key: 'Name',
        value: testPlaceHolder(detail?.client?.name)
      },
      {
        key: 'Abbreviation',
        value: testPlaceHolder(detail?.client?.abbreviation)
      }
    ])
  }, [detail])

  return (
    <Fragment>
      <Heading>Client Detail</Heading>
      <InfoList data={infoList} />
      <Heading padding='1rem 0 0 0'>File Manager</Heading>
      <FileManager />
    </Fragment>
  );
};
