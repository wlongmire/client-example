import { reduxForm } from 'redux-form';

import mapStateToProps from './mapStateToProps';
import handleSubmit from './handleSubmit';
import handleValidate from './handleValidate';

const fields = [
  'credentials.username',
  'credentials.password',
  'credentials.retypePassword'
];

const mapDispatchToProps = {
  onSubmit: handleSubmit
};

export default reduxForm({
  form: 'signupform',
  fields,
  handleValidate
}, mapStateToProps, mapDispatchToProps);
