import { reduxForm } from 'redux-form';

import mapStateToProps from './mapStateToProps';
import handleSubmit from './handleSubmit';

const fields = [
  'primaryNamedInsured',
  'hasOtherNamedInsured',
  'otherNamedInsured.name',
  'otherNamedInsured.relationship',
  'otherNamedInsured.role',
  'address.street',
  'address.city',
  'address.state',
  'address.zip',
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
  'contactInfo.phone'
];

const mapDispatchToProps = {
  onSubmit: handleSubmit
};

export default reduxForm({
  form: 'RatingForm',
  fields
}, mapStateToProps, mapDispatchToProps);