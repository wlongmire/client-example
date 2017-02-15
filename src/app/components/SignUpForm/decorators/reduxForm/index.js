import { reduxForm } from 'redux-form';

import mapStateToProps from './mapStateToProps';
import handleSubmit from './handleSubmit';

const fields = [
  'credentials.username',
  'credentials.password',
  'credentials.retypePassword',
  'account.firstName',
  'account.lastName',
  'account.broker'
];

const mapDispatchToProps = {
  onSubmit: handleSubmit
};

export default reduxForm({
  form: 'SignUpform',
  fields
}, mapStateToProps, mapDispatchToProps);
