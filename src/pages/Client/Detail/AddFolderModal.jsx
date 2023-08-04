import React from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Dialog from '../../../components/Dialog';
import useHttpClient from '../../../hooks/http-client';
import AddFolderForm from './AddFolderForm';
import constants from '../../../constants';

const AddFolderModal = ({ show, setShow, getClientFolders }) => {
  const { selectedClient, selectedFolder } = useSelector((state) => state.client);

  const { isLoading, request } = useHttpClient();

  const initialValues = {
    name: '',
    client: selectedClient?.id,
    parent: selectedFolder?.id,
  };

  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    client: yup.string().required()
  });

  const onSubmit = async (values) => {
    console.log(values)
    if (!values.parent) delete values.parent;

    try {
      await request.post(constants.apis.CREATE_FOLDER, values)
      setShow(false)
      getClientFolders()
    } catch (error) {
      console.log(error)
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: false,
    validateOnMount: false
  });

  return <Dialog
    titleText="Add Folder"
    type="form"
    show={show}
    setShow={setShow}
    fullWidth={true}
    submitType="submit"
    submitHandler={formik.handleSubmit}
    submitLoading={`${isLoading}`}
  >
    <AddFolderForm isLoading={isLoading} formik={formik} />
  </Dialog>;
}

export default AddFolderModal;