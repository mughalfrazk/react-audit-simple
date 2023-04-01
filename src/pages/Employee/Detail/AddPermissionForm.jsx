import { Fragment } from 'react';
import Input from '../../../components/Input';

const AddPermissionForm = ({ formik, clientList, actionList }) => {
  return (
    <Fragment>
      <Input
        element="select"
        label="Select Client"
        name="client_id"
        value={formik.values.client_id}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.client_id)}
        helperText={formik.errors.client_id}
      >
        {clientList.map((item) => (
          <Input
            element="option"
            key={item?.client?.id}
            value={item?.client?.id}
          >
            {item?.client?.name}
          </Input>
        ))}
      </Input>
      <Input
        element="select"
        label="Select Action"
        name="action_id"
        value={formik.values.action_id}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.action_id)}
        helperText={formik.errors.action_id}
      >
        {actionList.map((item) => (
          <Input element="option" key={item.id} value={item.id}>
            {item.name}
          </Input>
        ))}
      </Input>
    </Fragment>
  );
};

export default AddPermissionForm;
