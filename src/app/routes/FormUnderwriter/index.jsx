import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Button, ButtonGroup } from 'react-bootstrap'
import FormBuilder from 'components/shared/FormBuilder'
import DialogBox from 'components/shared/DialogBox'

import config from 'config'

import {
  CHANGE_SUBMISSION_STATUS,
  SUBMISSION_STATUS,
  CHANGE_SUBMISSION
} from 'app/constants/submission'

import ratingProducts from 'config/RatingProducts'

import ConfirmationModal from './ConfirmationModal'

// for testing purposes only
// import exampleSubmission from 'config/exampleSubmission'

class FormUnderwriter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      confirmation: false,
      submission: this.props.submission,
       // exampleSubmission <--- use this when testing ONLY!
      validationModal: false,
      cancelModal: false,
      requiredFields: []
    }

    this.handleSubmitQuote = this.handleSubmitQuote.bind(this)
    this.handleCancelQuote = this.handleCancelQuote.bind(this)
    this.handleSubmitForReview = this.handleSubmitForReview.bind(this)
    this.handleValidationOk = this.handleValidationOk.bind(this)

    this.handleCancelDialog = this.handleCancelDialog.bind(this)
    this.handleCancelOK = this.handleCancelOK.bind(this)
    this.handleCancelBack = this.handleCancelBack.bind(this)
  }

  componentWillMount() {
    //redirect if user is not an underwriter
    if (this.props.user.brokerId !== config.underwriterBrokerId) {
      this.props.dispatch(push('/'))
    }

    if (!this.props.submission.type) {
      this.props.dispatch(push('/'))
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.CREATING })
  }

  handleSubmitQuote() {
    const submission = Object.assign(this.state.submission, { status: 'QUOTE' })

    this.props.dispatch({ type: CHANGE_SUBMISSION, payload: { submission } })
    this.setState({
      confirmation: false
    })
    this.props.dispatch(push('/formResults'))
  }

  handleCancelQuote() {
    this.setState({
      ...this.state,
      confirmation: false
    })
  }

  handleSubmitForReview(sub, controlGroups, requiredFields) {
    // if exterior Demo is answered Yes, exteriorDemoSubcontractor is required

    if (sub.exteriorDemo == 'true' && !sub.exteriorDemoSubcontractor) {
      requiredFields.push({
        questionId: '12.1',
        text: 'Is the GC hiring a demo subcontractor?',
        inputType: 'text',
        name: 'exteriorDemoSubcontractor'
      })
    }

    const startDate = new Date(sub.anticipatedStartDate).getTime()
    const finishDate = new Date(sub.anticipatedFinishDate).getTime()

    // finish date value cannot be smaller than start date value
    if (startDate > finishDate) {
      requiredFields.push({
        questionId: '100',
        text: 'Anticipated Finish Date cannot be before Anticipated Start Date',
        inputType: 'text',
        name: 'finishDateCannotBeforeStartDate'
      })
    }

    if (requiredFields.length > 0) {
      this.setState({
        ...this.state,
        validationModal: true,
        requiredFields

      })
    } else {
      const submission = Object.assign(this.state.submission, sub)

      this.props.dispatch({ type: CHANGE_SUBMISSION, payload: { submission } })
      this.setState({
        ...this.state,
        requiredFields: [],
        submission,
        confirmation: true
      })
    }
  }

  handleValidationOk() {
    this.setState({
      ...this.state,
      validationModal: false
    })
  }

  handleCancelDialog() {
    this.setState({
      ...this.state,
      cancelModal: true
    })
  }

  handleCancelOK() {
    this.setState({
      ...this.state,
      cancelModal: false
    })

    this.props.dispatch(push('/submissions'))
  }

  handleCancelBack() {
    this.setState({
      ...this.state,
      cancelModal: false
    })
  }

  render() {
    const { submission } = this.state
    const { ratingProduct } = this.props
    const { submissionFormParams } = this.props

    const requiredList = () => {
      return this.state.requiredFields.map((r) => {
        const fieldText = (r.questionId == '2c') ? 'State' : r.text
        return (
          <li key={r.questionId} className="remainingField">{(fieldText || r.placeholder)}</li>
        )
      })
    }

    if (!ratingProduct) {
      return <div />
    }

    // removing matches from formbuilder to allow for projectAddress
    const formBuildSubmission = Object.assign({}, submission)
    delete formBuildSubmission['clearanceMatches']

    return (
      <div className="productChoice routeContainer">
        <h3>Enter the remaining submission details.</h3>
        <div className="formSubHeader">Once completed, a quote will be calculated based on your responses.</div>
        <br />
        <div className="formHeader">{ratingProduct.name} Application</div>

        <FormBuilder
          data={ratingProduct.formJSON}
          Validation={ratingProduct.Validation}
          initialValues={formBuildSubmission}
          initialParams={submissionFormParams}
          submitTitle="Review Submission"
          handleSubmit={this.handleSubmitForReview}
          submissionButtons={() => (
            <ButtonGroup>
              <Button className="btn" type="submit">Submit</Button>
              <a role="link" className="cancelLink" onClick={this.handleCancelDialog} >Cancel</a>
            </ButtonGroup>
          )}
        />

        <DialogBox
          custom_class="confirmationDialog"
          title="Is your data correct?"
          subtitle="Double check your values and push Get Pricing to confirm"
          show={this.state.confirmation}
        >
          <div>
            <ConfirmationModal
              form={ratingProduct.formJSON}
              submission={submission}
            />

            <ButtonGroup>
              <Button
                className="btn secondary"
                onClick={this.handleSubmitQuote}
              >Get Pricing</Button>
              <Button
                className="btn"
                onClick={this.handleCancelQuote}
              >Cancel</Button>
            </ButtonGroup>
          </div>
        </DialogBox>

        <DialogBox
          custom_class="confirmationDialog"
          title="Please fill out all required fields."
          show={this.state.validationModal}
        >
          <div>
            <h4>Here are your remaining questions:</h4>
            <ul className="section">
              { requiredList() }
            </ul>

            <h4>
              Note: All required fields are <span className="required">underlined in red.</span>
            </h4>
            <br />

            <ButtonGroup>
              <Button
                className="btn secondary"
                onClick={this.handleValidationOk}
              >
                Return to the Form
              </Button>
            </ButtonGroup>
          </div>
        </DialogBox>

        <DialogBox
          custom_class="cancelDialog"
          title="Are you sure you want to cancel?"
          show={this.state.cancelModal}
        >
          <div>
            <h4>Canceling now will remove all changes without saving. </h4>

            <ButtonGroup>
              <Button
                className="btn secondary"
                onClick={this.handleCancelOK}
              >OK</Button>
              <Button
                className="btn"
                onClick={this.handleCancelBack}
              >
                Return to the Form
              </Button>
            </ButtonGroup>
          </div>
        </DialogBox>
      </div>
    )
  }
}

FormUnderwriter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  submission: PropTypes.object.isRequired,
  ratingProduct: PropTypes.object,
  submissionFormParams: PropTypes.object,
}

export default connect((store) => {
  const submission = store.app.submission

  return ({
    user: store.user,
    submission,
    submissionFormParams: store.app.submissionFormParams,
    ratingProduct: ratingProducts[submission.type]
  })
})(FormUnderwriter)