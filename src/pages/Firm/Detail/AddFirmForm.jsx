import React from 'react';

import Input from '../../../components/Input';

const AddFirmForm = ({ formik }) => {
  return <div className='row'>
    <div className='col-md-6'>
      <Input 
        type="text"
        name="name"
        label="Company Name"
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
    <div className='col-md-6'>
      <Input 
        type="email"
        name="email"
        label="Email Address"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.email)}
        helperText={formik.errors.email}
      />
    </div>
    <div className='col-md-6'>
      <Input
        type="password"
        name="password"
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.password)}
        helperText={formik.errors.password}
      />
    </div>
  </div>
}

export default AddFirmForm;