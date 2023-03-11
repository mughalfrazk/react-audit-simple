import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Dialog from '../../../components/Dialog';
import AddPermissionForm from './AddPermissionForm';
import constants from '../../../constants';
import useHttpClient from '../../../hooks/http-client';
import { setActionList } from '../../../redux/slices/firm-slice';

const AddPermission = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { client: { clientList }, firm: { actionList }, user: { detail } } = useSelector(state => state)
  const { isLoading, request } = useHttpClient();

  const getData = async () => {
    const { data } = await request.get(constants.apis.ACTION_LIST);
    dispatch(setActionList(data));
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    console.log(actionList)
  }, [actionList])

  const initialValues = {
    user_id: detail?.id,
    client_id: "",
    action_id: ""
  }

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  const onSubmit = async (values) => {
    const { data } = await request.post(constants.apis.LOGIN, values);
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return <Dialog titleText="Add new permission" show={show} setShow={setShow} fullWidth={true} >
    <AddPermissionForm isLoading={isLoading} formik={formik} clientList={clientList} />
  </Dialog>
}

export default AddPermission;