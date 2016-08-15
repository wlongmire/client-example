export default function mapStateToProps() {
  return {
    initialValues: {
      primaryNamedInsured: '',
      hasOtherNamedInsured: null,
      otherNamedInsureds: [
        {
          name: '',
          relationship: '',
          role: ''
        }
      ],
      address: {
        street: '',
        city: '',
        state: '',
        zip: null
      },
      scope: '',
      term: null,
      costs: null,
      towerCraneUse: '',
      generalContractor: {
        isKnown: '',
        name: '',
        glCarrier: '',
        glLimits: null,
        isSupervisingSubs: ''
      },
      occupancyDetails: {
        willHave: '',
        isCoverageDesired: '',
        type: '',
        numberOfUnits: null,
        squareFootage: null,
        lossesInLastFiveYears: '',
        separateStairwells: '',
        separateEntry: '',
        securityPersonnel: '',
        doorman: '',
        securityCameras: '',
        buildingAccessLimited: ''
      },
      demoDetails: {
        willHave: '',
        subcontractor: '',
        costs: null,
        duration: null,
        pedestrianSafetyPrecautions: null
      },
      workDetails: {
        hasStarted: '',
        startDate: '',
        whatsCompleted: '',
        totalSpend: null,
        generalContractor: ''
      },
      contactInfo: {
        email: '',
        phone: ''
      }
    }
  }
}
