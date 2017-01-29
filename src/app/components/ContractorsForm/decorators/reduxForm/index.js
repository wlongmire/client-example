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
  'projectDefinedAreaScopeDetails',
  'scope',
  'isSupervisingSubs',
  'projectRequirements',
  'limitsRequested',
  'type',
  'contactInfo.email',
  'contactInfo.phone',
  'overFourFloors',
  'nycha'
];

const mapDispatchToProps = {
  onSubmit: handleConfirmation
};

export default reduxForm({
  form: 'ContractorsForm',
  fields
}, mapStateToProps, mapDispatchToProps);