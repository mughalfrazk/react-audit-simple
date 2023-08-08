import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Dialog from '../../components/Dialog';
import useHttpClient from '../../hooks/http-client';
import AddNewEmployeeForm from './AddNewEmployeeForm';
import constants from '../../constants';
import { updateEmployeeList } from '../../redux/slices/employee-slice';

const AddNewEmployeeModal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { detail } = useSelector(state => state.user);
  const { isLoading, request } = useHttpClient();

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role_id: '',
    company_id: detail.company.id
  };

  const validationSchema = yup.object({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('First name is required'),
    email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
    password: yup.string('Enter your password').min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
    role_id: yup.number().required('Please select a role'),
    company_id: yup.number().required()
  });

  const onSubmit = async (values) => {
    try {
      const { data } = await request.post(constants.apis.CREATE_EMPLOYEE, values);
      dispatch(updateEmployeeList(data))
      setShow(false)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange: false
  });

  return <Dialog
    titleText="Add new Employee"
    type="form"
    show={show}
    setShow={setShow}
    fullWidth={true}
    submitType="submit"
    submitHandler={formik.handleSubmit}
    submitLoading={isLoading ? "yes" : "no"}
  >
    <AddNewEmployeeForm isLoading={isLoading} formik={formik} />
  </Dialog>;
}

export default AddNewEmployeeModal;