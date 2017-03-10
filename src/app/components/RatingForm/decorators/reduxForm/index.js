import { reduxForm } from 'redux-form';

import mapStateToProps from './mapStateToProps';
import { handleConfirmation } from './handleSubmit';

const fields = [
  'primaryNamedInsured',
  'namedInsuredAddress.street',
  'namedInsuredAddress.city',
  'namedInsuredAddress.state',
  'namedInsuredAddress.zip',

  'hasOtherNamedInsured',
  'otherNamedInsured.relationship',
  'otherNamedInsured.name',
  'otherNamedInsured.street',
  'otherNamedInsured.city',
  'otherNamedInsured.state',
  'otherNamedInsured.greaterThanTwoNamed',
  'otherNamedInsured.zip',

  'hasAdditionalInsured',
  'additionalInsured.name',
  'additionalInsured.relationship',
  'additionalInsured.role',
  'additionalInsured.greaterThanTwoAdditional',

  'address.street',
  'address.city',
  'address.state',
  'address.zip',

  'projectDefinedAreaScope',
  'projectDefinedAreaScopeDetails',

  'scope',
  'term',
  'costs',
  'towerCraneUse',
  'generalContractor.isKnown',
  'generalContractor.name',
  'generalContractor.glCarrier',
  'generalContractor.glLimits',
  'generalContractor.isSupervisingSubs',
  'occupancyDetails.willHave',
  'occupancyDetails.isCoverageDesired',
  'occupancyDetails.type',
  'occupancyDetails.numberOfUnits',
  'occupancyDetails.squareFootage',
  'occupancyDetails.lossesInLastFiveYears',
  'occupancyDetails.separateStairwells',
  'occupancyDetails.separateEntry',
  'occupancyDetails.securityPersonnel',
  'occupancyDetails.doorman',
  'occupancyDetails.securityCameras',
  'occupancyDetails.buildingAccessLimited',
  'demoDetails.willHave',
  'demoDetails.subcontractor',
  'demoDetails.costs',
  'demoDetails.duration',
  'demoDetails.pedestrianSafetyPrecautions',
  'workDetails.hasStarted',
  'workDetails.startDate',
  'workDetails.whatsCompleted',
  'workDetails.totalSpend',
  'workDetails.generalContractor',
  'contactInfo.email',
  'contactInfo.phone',
  'excessDetails.required',
  'excessDetails.limits',
  'generalComments',
  'type'
];

const mapDispatchToProps = {
  onSubmit: handleConfirmation
};

export default reduxForm({
  form: 'RatingForm',
  fields
}, mapStateToProps, mapDispatchToProps);
