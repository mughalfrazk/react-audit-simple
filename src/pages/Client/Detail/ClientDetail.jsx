import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';

import useHttpClient from '../../../hooks/http-client';
import constants from '../../../constants';
import { setClientDetail, setFolders } from '../../../redux/slices/client-slice';
import FileManager from '../../../components/FileManager';
import Heading from '../../../components/Heading';
import InfoList from '../../../components/InfoList/InfoList';
import { testPlaceHolder } from '../../../services/utils/functions';

export default () => {
  const { id } = useParams();
  const { request } = useHttpClient();
  const dispatch = useDispatch();
  const { selectedClient, folders } = useSelector((state) => state.client);
  const [infoList, setInfoList] = useState([]);

  const getFirmDetail = async (id) => {
    const { data } = await request.get(constants.apis.CLIENT_DETAIL(id));
    dispatch(setClientDetail(data));
  };

  const getClientFolders = async (id) => {
    const { data } = await request.get(constants.apis.CLIENT_FOLDERS(id))
    dispatch(setFolders(data))
  }

  useEffect(() => {
    if (id) {
      getFirmDetail(id);
      getClientFolders(id);
    }
  }, [id]);

  useEffect(() => {
    if (!!selectedClient) setInfoList([
      {
        key: 'Name',
        value: testPlaceHolder(selectedClient?.client?.name)
      },
      {
        key: 'Abbreviation',
        value: testPlaceHolder(selectedClient?.client?.abbreviation)
      }
    ])
  }, [selectedClient])

  return (
    <Fragment>
      <Heading>Client Detail</Heading>
      {infoList && <InfoList data={infoList} />}
      <Heading padding='1rem 0 0 0'>File Manager</Heading>
      {folders && <FileManager folders={folders} />}
    </Fragment>
  );
};
