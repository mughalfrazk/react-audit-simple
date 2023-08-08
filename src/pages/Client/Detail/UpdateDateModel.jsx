import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Dialog from '../../../components/Dialog';
import useHttpClient from '../../../hooks/http-client';
import UpdateDateForm from './UpdateDateForm';
import constants from '../../../constants';

const UpdateDateModal = ({ show, setShow, selectedAuditDate, selectedDocument }) => {
  const { isLoading, request } = useHttpClient();
  const { selectedClient } = useSelector((state) => state.client);

  const initialValues = {
    client: selectedClient.id,
    audit_date: selectedAuditDate
  };

  const validationSchema = yup.object({
    client: yup.number().required(),
    audit_date: yup.string().required('Date is required'),
  });

  const onSubmit = async (values) => {
    console.log(values)

    try {
      await request.patch(constants.apis.UPDATE_DOCUMENT(selectedDocument), values)
      setShow(false)
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
    <UpdateDateForm formik={formik} />
  </Dialog>;
}

export default UpdateDateModal;