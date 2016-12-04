import { reduxForm } from 'redux-form';

import mapStateToProps from './mapStateToProps';
import handleSubmit from './handleSubmit';

const fields = [
  'credentials.username',
  'credentials.password'
];

const mapDispatchToProps = {
  onSubmit: handleSubmit
};

export default reduxForm({
  form: 'signinform',
  fields,
}, mapStateToProps, mapDispatchToProps);
