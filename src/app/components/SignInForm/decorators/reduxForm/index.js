import { reduxForm } from 'redux-form';

import mapStateToProps from './mapStateToProps';
import handleSubmit from './handleSubmit';
import validate from './validate';

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
  validate
}, mapStateToProps, mapDispatchToProps);
