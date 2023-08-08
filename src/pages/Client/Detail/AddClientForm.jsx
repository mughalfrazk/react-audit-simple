import React from 'react';

import Input from '../../../components/Input';

const AddClientForm = ({ formik }) => {
  return <div className='row'>
    <div className='col-md-6'>
      <Input 
        type="text"
        name="name"
        label="Client Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.name)}
        helperText={formik.errors.name}
      />
    </div>
    <div className='col-md-6'>
      <Input
        type="text"
        name="abbreviation"
        label="Abbreviation"
        value={formik.values.abbreviation}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.abbreviation)}
        helperText={formik.errors.abbreviation}
        />
    </div>
  </div>
}

export default AddClientForm;