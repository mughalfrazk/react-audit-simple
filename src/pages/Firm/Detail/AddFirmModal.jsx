import React from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Dialog from '../../../components/Dialog';
import useHttpClient from '../../../hooks/http-client';
import AddFirmForm from './AddFirmForm';
import constants from '../../../constants';

const AddFirmModal = ({ show, setShow }) => {
  const { isLoading, request } = useHttpClient();

  const initialValues = {
    company_type_id: 1,
    name: "",
    abbreviation: "",
    email: "",
    password: ""
  };

  const validationSchema = yup.object({
    company_type_id: yup.number().required(),
    name: yup.string().required('Name is required'),
    abbreviation: yup.string(),
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required')
  });

  const onSubmit = async (values) => {
    console.log(values)

    try {
      await request.post(constants.apis.CREATE_COMPANY, values)
      setShow(false)
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
    titleText="Add Firm"
    type="form"
    show={show}
    setShow={setShow}
    fullWidth={true}
    submitType="submit"
    submitHandler={formik.handleSubmit}
    submitLoading={isLoading ? "yes" : "no"}
  >
    <AddFirmForm isLoading={isLoading} formik={formik} />
  </Dialog>;
}

export default AddFirmModal;