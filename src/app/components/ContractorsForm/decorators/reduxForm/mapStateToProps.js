export default function mapStateToProps(state) {

  const submission = state.submissions.selectedSubmission;
  console.log(submission);

  return {
    initialValues: {
      type: 'ocp',
      primaryNamedInsured: submission ? submission.primaryNamedInsured :  '',
      anticipatedFinishDate: submission && submission.anticipatedFinishDate? submission.anticipatedFinishDate : '',
      projectDefinedAreaScope: submission && submission.projectDefinedAreaScope? submission.projectDefinedAreaScope : '',
      projectDefinedAreaScopeDetails: submission && submission.projectDefinedAreaScopeDetails ? submission.projectDefinedAreaScopeDetails : '',
      address: {
        street: submission && submission.projectAddress ? submission.projectAddress.street :  '',
        city: submission && submission.projectAddress ? submission.projectAddress.city :  '',
        state: submission && submission.projectAddress ? submission.projectAddress.state :  '',
        zip: submission && submission.projectAddress ? submission.projectAddress.zip :  null,
      },
      scope: submission ? submission.scope : '',
      term: submission ? submission.term : null,
      costs: submission ? submission.costs : null,
      generalContractor: {
        name: submission && submission.generalContractorInfo ? submission.generalContractorInfo.name: '',
        glCarrier: submission && submission.generalContractorInfo ? submission.generalContractorInfo.glCarrier: '',
        glLimits: submission && submission.generalContractorInfo ? submission.generalContractorInfo.null: '',
        isSupervisingSubs: submission && submission.generalContractorInfo ? submission.generalContractorInfo.isSupervisingSubs: ''
      },
      contactInfo: {
        email: submission && submission.contactInfo ? submission.contactInfo.email: '',
        phone: submission && submission.contactInfo ? submission.contactInfo.phone: '',
      }
    }
  };
}
