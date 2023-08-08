import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useHttpClient from '../../../hooks/http-client';
import constants from '../../../constants';
import { setClientDetail, setFolders } from '../../../redux/slices/client-slice';
import FileManager from './FileManager';
import Heading from '../../../components/Heading';
import InfoList from '../../../components/InfoList/InfoList';
import { testPlaceHolder } from '../../../services/utils/functions';
import { setSelectedFolder } from '../../../redux/slices/client-slice';
import AddFolderModal from './AddFolderModal';

export default () => {
  const { id } = useParams();
  const { request } = useHttpClient();
  const dispatch = useDispatch();
  const { selectedClient, folders } = useSelector((state) => state.client);
  
  const [infoList, setInfoList] = useState([]);
  const [showAddFolder, setShowAddFolder] = useState(false);

  const getFirmDetail = async () => {
    const { data } = await request.get(constants.apis.CLIENT_DETAIL(id));
    dispatch(setClientDetail(data));
  };

  const getClientFolders = async () => {
    const { data } = await request.get(constants.apis.CLIENT_FOLDERS(id, "all"))
    dispatch(setFolders(data))
    if(!!data.length) dispatch(setSelectedFolder({ id: data[0].id, name: data[0].name }))
    else dispatch(setSelectedFolder({ id: 0, name: "" }))
  }

  useEffect(() => {
    getFirmDetail();
    getClientFolders();
  }, []);

  useEffect(() => {
    if (!!selectedClient) setInfoList([
      {
        key: 'Name',
        value: testPlaceHolder(selectedClient?.name)
      },
      {
        key: 'Abbreviation',
        value: testPlaceHolder(selectedClient?.abbreviation)
      }
    ])
  }, [selectedClient])

  return (
    <Fragment>
      {showAddFolder && <AddFolderModal show={showAddFolder} setShow={setShowAddFolder} getClientFolders={getClientFolders} />}
      <Heading>Client Detail</Heading>
      {infoList && <InfoList data={infoList} />}
      <Heading padding='1rem 0 0 0'>File Manager</Heading>
      {folders && <FileManager folders={folders} setShowAddFolderModal={setShowAddFolder} getClientFolders={getClientFolders} />}
    </Fragment>
  );
};
