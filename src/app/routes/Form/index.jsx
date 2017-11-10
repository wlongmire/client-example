import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Button, ButtonGroup } from 'react-bootstrap'
import DialogBox from 'components/shared/DialogBox'
import ConfirmationModal from './ConfirmationModal'
import FormBuilder from 'components/shared/FormBuilder'

import {
  CHANGE_SUBMISSION_STATUS,
  SUBMISSION_STATUS,
  CHANGE_SUBMISSION
} from 'app/constants/submission'

import ratingProducts from 'config/RatingProducts'

// for testing purposes only
import exampleSubmission from 'config/exampleSubmission'

class Form extends Component {
  constructor(props) {
    super(props)

    console.log('constructing')

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
    if (!this.props.submission.type) {
      this.props.dispatch(push('/productChoice'))
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

    const passedDiv = (
      <div>
        <div className={'sub-header-firstRow clearance-pass'}>CLEARANCE PASSED</div>
        <div className="sub-header-secondRow clearance-pass">Submission is available to quote</div>
        <div className="sub-header-Complete">
          Complete this application for a quick pricing indication
        </div>
      </div>
    )

    const underReviewDiv = (
      <div>
        <div className={'sub-header-firstRow clearance-review'}>CLEARANCE NEEDS REVIEW</div>
        <div className={'sub-header-secondRow clearance-review'}>A similar submission has been found</div>
        <div className="sub-header-thirdRow">How to get a quote</div>
        <ul className="sub-header-bullets">
          <li>Complete the below application</li>
          <li>We&apos;ll email the prices after a manual check is conducted.</li>
        </ul>
      </div>
    )

    console.log(ratingProduct)
    console.log(submission)
    console.log(submissionFormParams)

    return (
      <div className="productChoice routeContainer">
        <h3>Fill out the rest of the details.</h3>
        <div className="formSubHeader">You can submit this application online.</div>
        <br />
        <div className="submission-status-div">
          {(this.props.submission.clearanceStatus == 'pass') ? passedDiv : underReviewDiv }
        </div>
        <br />
        <div className="formHeader">{ratingProduct.name} Application</div>

        <FormBuilder
          data={ratingProduct.formJSON}
          Validation={ratingProduct.Validation}
          initialValues={submission}
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

Form.propTypes = {
  dispatch: PropTypes.func.isRequired,
  submission: PropTypes.object.isRequired,
  ratingProduct: PropTypes.object,
  submissionFormParams: PropTypes.object,
}

export default connect((store) => {
  const submission = store.app.submission

  return ({
    submission,
    submissionFormParams: store.app.submissionFormParams,
    ratingProduct: ratingProducts[submission.type]
  })
})(Form)

// const submissionStatus = {
//   passed: {
//     css: 'clearance-pass',
//     firstRow: 'CLEARANCE PASSED',
//     secondRow: 'Submission is available to quote',
//     thirdRow: 'Complete this application for a quick pricing indication'
//   },
//   underReview: {
//     css: 'clearance-review',
//     firstRow: 'CLEARANCE NEEDS REVIEW',
//     secondRow: 'A similar submission has been found',
//     thirdRow: 'How to get a quote',
//     bulletOne: 'Complete the below application',
//     bulletTwo: 'We\'ll email the prices after a manual check is conducted',
//   }
// }
// <div className={`sub-header-firstRow ${submissionStatus[clearanceStatus].css}`}>{submissionStatus[clearanceStatus].firstRow}</div>
// <div className={`sub-header-secondRow ${submissionStatus[clearanceStatus].css}`}>{submissionStatus[clearanceStatus].secondRow}</div>
// <div className="sub-header-thirdRow">{submissionStatus[clearanceStatus].thirdRow}</div>
// {submissionStatus[clearanceStatus].bulletOne && submissionStatus[clearanceStatus].bulletTwo &&
// <ul className="sub-header-bullets">
//   <li>{submissionStatus[clearanceStatus].bulletOne}</li>
//   <li>{submissionStatus[clearanceStatus].bulletTwo}</li>
// </ul>
// }

