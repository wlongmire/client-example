import { reduxForm } from 'redux-form';

import mapStateToProps from './mapStateToProps';
import handleSubmit from './handleSubmit';
import validate from './validate';

const fields = [
  'credentials.username',
  'credentials.password',
  'credentials.retypePassword',
  'account.firstName',
  'account.lastName'
];

const mapDispatchToProps = {
  onSubmit: handleSubmit
};

export default reduxForm({
  form: 'signinform',
  fields,
  validate
}, mapStateToProps, mapDispatchToProps);