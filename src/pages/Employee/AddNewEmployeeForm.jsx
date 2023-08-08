import React from 'react';

import Input from '../../components/Input';

const AddNewEmployeeForm = ({ formik }) => {
  return <div className='row'>
    <div className='col-md-6'>
      <Input 
        type="text"
        name="first_name"
        label="First Name"
        value={formik.values.first_name}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.first_name)}
        helperText={formik.errors.first_name}
      />
    </div>
    <div className='col-md-6'>
      <Input
        type="text"
        name="last_name"
        label="Last Name"
        value={formik.values.last_name}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.last_name)}
        helperText={formik.errors.last_name}
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
    <div className='col-md-6'>
      <Input
        element="select"
        label="Select Role"
        name="role_id"
        value={formik.values.role_id}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.role_id)}
        helperText={formik.errors.role_id}
      >
        <Input element="option" key={2} value={2}>Admin</Input>
        <Input element="option" key={3} value={3}>Employee</Input>
      </Input>
    </div>
  </div>
}

export default AddNewEmployeeForm;