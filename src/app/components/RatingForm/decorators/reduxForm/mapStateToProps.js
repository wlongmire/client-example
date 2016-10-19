export default function mapStateToProps(state) {
/*
if the form have initialValues, it means an edit is taking place 
otherwise a new submission is taking place
*/
  const submission = state.submissions.selectedSubmission;

  return {
    initialValues: {
      primaryNamedInsured: submission ? submission.primaryNamedInsured :  '',
      namedInsuredAddress: {
        street: submission && submission.namedInsuredAddress ? submission.namedInsuredAddress.street :  '',
        city: submission && submission.namedInsuredAddress ? submission.namedInsuredAddress.city :  '',
        state: submission && submission.namedInsuredAddress ? submission.namedInsuredAddress.state :  '',
        zip: submission && submission.namedInsuredAddress ? submission.namedInsuredAddress.zip :  null
      },
      hasOtherNamedInsured: submission ? submission.hasOtherNamedInsured : null,
      otherNamedInsureds: [
        {
          name: submission && submission.otherNamedInsureds ? submission.otherNamedInsureds[0].name : '',
          relationship: submission && submission.otherNamedInsureds ? submission.otherNamedInsureds[0].relationship : '',
          role: submission && submission.otherNamedInsureds ? submission.otherNamedInsureds[0].role : ''
        }
      ],
      address: {
        street: submission && submission.projectAddress ? submission.projectAddress.street :  '',
        city: submission && submission.projectAddress ? submission.projectAddress.city :  '',
        state: submission && submission.projectAddress ? submission.projectAddress.state :  '',
        zip: submission && submission.projectAddress ? submission.projectAddress.zip :  null,
      },
      scope: submission ? submission.scope : '',
      term: submission ? submission.term : null,
      costs: submission ? submission.costs : null,
      towerCraneUse: submission ? submission.towerCraneUse : '',
      generalContractor: {
        isKnown: submission && submission.generalContractor ? submission.generalContractor.isKnown: '',
        name: submission && submission.generalContractor ? submission.generalContractor.name: '',
        glCarrier: submission && submission.generalContractor ? submission.generalContractor.glCarrier: '',
        glLimits: submission && submission.generalContractor ? submission.generalContractor.null: '',
        isSupervisingSubs: submission && submission.generalContractor ? submission.generalContractor.isSupervisingSubs: ''
      },
      occupancyDetails: {
        willHave: submission && submission.occupancyDetails ? submission.occupancyDetails.willHave: '',
        isCoverageDesired: submission && submission.occupancyDetails ? submission.occupancyDetails.isCoverageDesired: '',
        type: submission && submission.occupancyDetails ? submission.occupancyDetails.type: '',
        numberOfUnits: submission && submission.occupancyDetails ? submission.occupancyDetails.numberOfUnits: null,
        squareFootage: submission && submission.occupancyDetails ? submission.occupancyDetails.squareFootage: null,
        lossesInLastFiveYears: submission && submission.occupancyDetails ? submission.occupancyDetails.lossesInLastFiveYears: '',
        separateStairwells: submission && submission.occupancyDetails ? submission.occupancyDetails.separateStairwells: '',
        separateEntry: submission && submission.occupancyDetails ? submission.occupancyDetails.separateEntry: '',
        securityPersonnel: submission && submission.occupancyDetails ? submission.occupancyDetails.securityPersonnel: '',
        doorman: submission && submission.occupancyDetails ? submission.occupancyDetails.doorman: '',
        securityCameras: submission && submission.occupancyDetails ? submission.occupancyDetails.securityCameras: '',
        buildingAccessLimited: submission && submission.occupancyDetails ? submission.occupancyDetails.buildingAccessLimited: ''
      },
      demoDetails: {
        willHave: submission && submission.demoDetails ? submission.demoDetails.willHave: '',
        subcontractor: submission && submission.demoDetails ? submission.demoDetails.subcontractor: '',
        costs: submission && submission.demoDetails ? submission.demoDetails.costs: null,
        duration: submission && submission.demoDetails ? submission.demoDetails.duration: null,
        pedestrianSafetyPrecautions: submission && submission.demoDetails ? submission.demoDetails.pedestrianSafetyPrecautions: null,
      },
      workDetails: {
        hasStarted: submission && submission.workDetails ? submission.workDetails.hasStarted: '',
        startDate: submission && submission.workDetails ? submission.workDetails.startDate: '',
        whatsCompleted: submission && submission.workDetails ? submission.workDetails.whatsCompleted: '',
        totalSpend: submission && submission.workDetails ? submission.workDetails.totalSpend: null,
        generalContractor: submission && submission.workDetails ? submission.workDetails.generalContractor: null,
      },
      excessDetails: {
        required: submission && submission.excessDetails ? submission.excessDetails.required: '',
        limits: submission && submission.excessDetails ? submission.excessDetails.limits: 0,
      },
      contactInfo: {
        email: submission && submission.contactInfo ? submission.contactInfo.email: '',
        phone: submission && submission.contactInfo ? submission.contactInfo.phone: '',
      }
    }
  };
}
