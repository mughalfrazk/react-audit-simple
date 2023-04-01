import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Dialog from '../../../components/Dialog';
import AddPermissionForm from './AddPermissionForm';
import constants from '../../../constants';
import useHttpClient from '../../../hooks/http-client';
import { setActionList } from '../../../redux/slices/firm-slice';
import { setClientsList } from '../../../redux/slices/client-slice';

const AddPermissionModal = ({ show, setShow, reloadPermissions }) => {
  const dispatch = useDispatch();
  const {
    client: { clientList },
    firm: { actionList },
    user: { detail },
  } = useSelector((state) => state);
  const { selectedEmployee } = useSelector((state) => state.employee);
  const { isLoading, request } = useHttpClient();

  const getData = async () => {
    const { data } = await request.get(constants.apis.ACTION_LIST);
    dispatch(setActionList(data));
  };

  const getClientsList = async () => {
    const { data } = await request.get(constants.apis.CLIENT_LIST(selectedEmployee?.company?.id));
    dispatch(setClientsList(data));
  };

  useEffect(() => {
    getData();
    getClientsList();
  }, []);

  const initialValues = {
    user_id: selectedEmployee?.id,
    client_id: '',
    action_id: '',
  };

  const validationSchema = yup.object({
    client_id: yup.number('Select a client').required('Client is required'),
    action_id: yup.number('Select an action').required('Action is required'),
  });

  const onSubmit = async (values) => {
    await request.post(constants.apis.CREATE_CLIENT_ASSIGNMENT, values);
    setShow(false)
    reloadPermissions();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Dialog
      titleText="Add new permission"
      type="form"
      show={show}
      setShow={setShow}
      fullWidth={true}
      submitType="submit"
      submitHandler={formik.handleSubmit}
      submitLoading={`${isLoading}`}
    >
      <AddPermissionForm
        isLoading={isLoading}
        formik={formik}
        clientList={clientList}
        actionList={actionList}
      />
    </Dialog>
  );
};

export default AddPermissionModal;
