import React, { Fragment } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import useHttpClient from "../../../hooks/http-client";
import LoginUI from "./LoginUI";
import constants from '../../../constants';
import Button from '../../../components/Button';
import { useAuth } from '../../../hooks/auth';

export default () => {
  const { login } = useAuth();
  const { isLoading, request } = useHttpClient();

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
    const {data} = await request.post(constants.apis.LOGIN, values);
    login(data);
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange: false
  })

  return <Fragment>
    <LoginUI isLoading={isLoading} formik={formik} />
    <Button onClick={async () => {
      await request.get("auth/profile")
    }}>Who am i</Button>
  </Fragment>
};
