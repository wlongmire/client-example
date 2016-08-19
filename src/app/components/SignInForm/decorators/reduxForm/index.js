import { reduxForm } from 'redux-form';

import mapStateToProps from './mapStateToProps';
import handleSubmit from './handleSubmit';

const fields = [
  'credentials.username',
  'credentials.password',
  'credentials.retypePassword'
];

const mapDispatchToProps = {
  onSubmit: handleSubmit
};

export default reduxForm({
  form: 'SignUpForm',
  fields
}, mapStateToProps, mapDispatchToProps);
