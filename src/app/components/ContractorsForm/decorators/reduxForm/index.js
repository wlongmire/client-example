import { reduxForm } from 'redux-form';

import mapStateToProps from './mapStateToProps';
import { handleConfirmation } from './handleSubmit';

const fields = [
  'primaryNamedInsured',
  'costs',
  'term',
  'anticipatedFinishDate',
  'generalContractor.name',
  'generalContractor.glCarrier',
  'generalContractor.glExpirationDate',
  'generalContractor.glLimits',
  'address.street',
  'address.city',
  'address.state',
  'address.zip',
  'projectDefinedAreaScope',
  'scope',
  'isSupervisingSubs',
  'projectRequirements',
  'limitsRequested',
  'type'
];

const mapDispatchToProps = {
  onSubmit: handleConfirmation
};

export default reduxForm({
  form: 'ContractorsForm',
  fields
}, mapStateToProps, mapDispatchToProps);