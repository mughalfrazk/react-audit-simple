import React from "react";

import Input from "../../../components/Input";

const UpdateDateForm = ({ formik }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <Input
          type="date"
          name="audit_date"
          label="Audit Date"
          value={formik.values.audit_date}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.audit_date)}
          helperText={formik.errors.audit_date}
          sx={{ width: '100%' }}
        />
      </div>
    </div>
  );
};

export default UpdateDateForm;
