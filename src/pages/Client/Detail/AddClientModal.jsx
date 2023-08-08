import React from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Dialog from '../../../components/Dialog';
import useHttpClient from '../../../hooks/http-client';
import AddClientForm from './AddClientForm';
import constants from '../../../constants';

const AddClientModal = ({ show, setShow, getClientsList }) => {
  const { isLoading, request } = useHttpClient();
  const { detail } = useSelector(state => state.user);

  const initialValues = {
    company_type_id: 2,
    name: "",
    abbreviation: "",
    firm_id: detail.company.id
  };

  const validationSchema = yup.object({
    company_type_id: yup.number().required(),
    name: yup.string().required('Name is required'),
    abbreviation: yup.string().required('Abbreviation is required'),
    firm_id: yup.number().required()
  });

  const onSubmit = async (values) => {
    try {
      await request.post(constants.apis.CREATE_COMPANY, values)
      setShow(false)
      getClientsList()
    } catch (error) {
      console.log(error)
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange: false,
  });

  return <Dialog
    titleText="Add Client"
    type="form"
    show={show}
    setShow={setShow}
    fullWidth={true}
    submitType="submit"
    submitHandler={formik.handleSubmit}
    submitLoading={isLoading ? "yes" : "no"}
  >
    <AddClientForm isLoading={isLoading} formik={formik} />
  </Dialog>;
}

export default AddClientModal;