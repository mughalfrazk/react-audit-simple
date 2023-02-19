import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import useHttpClient from "../../../hooks/useHttpClient";
import LoginUI from "./LoginUI";
import constants from '../../../constants';
import Button from '../../../components/Button';

export default () => {
  const globalLoading = useSelector(state => state.local.globalLoading)
  const {isLoading, request} = useHttpClient();

  const initialValues = {
    email: "",
    password: "",
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
    const res = await request.post(constants.apis.LOGIN, values);
    console.log(res);
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  const onLogin = async () => {
    return await request.get("user/auth/whoami")
  }

  return <Fragment>
    <LoginUI isLoading={isLoading} formik={formik} onLogin={onLogin} />
    {/* <Button onClick={async () => {
      await request.get("user/auth/whoami")
    }}>Who am i</Button> */}
  </Fragment>
};
