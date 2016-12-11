export default function mapStateToProps(state) {
/*
if the form have initialValues, it means an edit is taking place
otherwise a new submission is taking place
*/

  const submission = state.submissions.selectedSubmission;

  return {
    initialValues: {
      type: 'ocp',
      primaryNamedInsured: submission ? submission.primaryNamedInsured :  '',
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
        name: submission && submission.generalContractor ? submission.generalContractor.name: '',
        glCarrier: submission && submission.generalContractor ? submission.generalContractor.glCarrier: '',
        glLimits: submission && submission.generalContractor ? submission.generalContractor.null: '',
        isSupervisingSubs: submission && submission.generalContractor ? submission.generalContractor.isSupervisingSubs: ''
      }
    }
  };
}
