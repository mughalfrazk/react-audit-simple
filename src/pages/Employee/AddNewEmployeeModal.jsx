import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Dialog from '../../components/Dialog';
import useHttpClient from '../../hooks/http-client';
import AddNewEmployeeForm from './AddNewEmployeeForm';

const AddNewEmployeeModal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { isLoading, request } = useHttpClient();

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role_id: ''
  };

  const validationSchema = yup.object({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('First name is required'),
    email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
    password: yup.string('Enter your password').min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
    role_id: yup.number().required('Please select a role')
  });

  const onSubmit = async (values) => {
    console.log(values)
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: false,
    validateOnMount: false
  });

  return <Dialog
    titleText="Add new permission"
    type="form"
    show={show}
    setShow={setShow}
    fullWidth={true}
    submitType="submit"
    submitHandler={formik.handleSubmit}
    submitLoading={`${isLoading}`}
  >
    <AddNewEmployeeForm isLoading={isLoading} formik={formik} />
  </Dialog>;
}

export default AddNewEmployeeModal;