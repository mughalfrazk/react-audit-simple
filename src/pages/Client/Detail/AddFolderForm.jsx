import React from 'react';

import Input from '../../../components/Input';

const AddFolderForm = ({ formik }) => {
  return <div className='row'>
    <div className='col-12'>
      <Input 
        type="text"
        name="name"
        label="Folder Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.name)}
        helperText={formik.errors.name}
      />
    </div>
  </div>
}

export default AddFolderForm;