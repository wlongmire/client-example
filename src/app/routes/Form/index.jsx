import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import {connect} from 'react-redux'
import { push } from 'react-router-redux'

import { LinkContainer } from 'react-router-bootstrap'
import { Button, ButtonGroup } from 'react-bootstrap'

import DialogBox from 'components/shared/DialogBox'
import ConfirmationModal from './ConfirmationModal'
import FormBuilder from 'components/shared/FormBuilder'

import constants from 'app/constants/app'
import ratingProducts from 'config/RatingProducts'

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      confirmation:false,
      submission: this.props.submission,
      validationModal:false,
      requiredFields: []
    };

    this.handleSubmitQuote = this.handleSubmitQuote.bind(this)
    this.handleCancelDialog = this.handleCancelDialog.bind(this)
    this.handleSubmitForReview = this.handleSubmitForReview.bind(this)
    this.handleValidationOk = this.handleValidationOk.bind(this)
  }

  componentWillMount(){
    if (!this.props.submission.type)
      this.props.dispatch(push('/productChoice'));
  }

  componentDidMount(){
    const { CHANGE_SUBMISSION_STATUS, SUBMISSION_STATUS } = constants
    this.props.dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.CREATING })
  }

  handleSubmitQuote() {
    const { CHANGE_SUBMISSION } = constants
    const submission = Object.assign(this.state.submission, {status:"QUOTE"})

    this.props.dispatch({ type:CHANGE_SUBMISSION, submission })
    this.setState({confirmation:false})

    this.props.dispatch(push("/formResults"));
  }

  handleCancelDialog() {
    this.setState({
      ...this.state,
      confirmation:false
    })
  }

  handleSubmitForReview(sub, controlGroups, requiredFields) {
    if(requiredFields.length > 0){
      this.setState({
        ...this.state,
        validationModal: true,
        requiredFields

      })
    } else {
      const submission = Object.assign(this.state.submission, sub);

      this.setState({
        ...this.state,
        requiredFields: [],
        submission,
        confirmation:true
      });
    }
  }

  handleValidationOk(){
    this.setState({
      ...this.state,
      validationModal: false
    })
  }

  render() {
    const { submission } = this.state;
    const { ratingProduct } = this.props;

    const requiredList = ()=> {
      return this.state.requiredFields.map((r, idx)=>{
        const fieldText = (r.questionId == '2c')?"State":r.text
        
        return (
            <li key={idx} className="remainingField">{(fieldText ? fieldText : r.placeholder)}</li>
          );
      })
    }

    if (!ratingProduct)
      return <div></div>
    return (
      <div className='page productChoice'>
        <h3>Fill out the rest of the details.</h3>
        <h4><strong>{ratingProduct.name}</strong> Submission</h4>
      
        <FormBuilder
            data={ratingProduct.formJSON}
            Validation={ratingProduct.Validation}
            initialValues={submission}
            submitTitle="Review Submission"
            handleSubmit={this.handleSubmitForReview}
        />
      
        <DialogBox
            custom_class="confirmationDialog"
            title="Is your data correct?"
            subtitle="Double check your values and push Get Quote to confirm"
            show={this.state.confirmation}
            >
            <div>
              <ConfirmationModal 
                form={ratingProduct.formJSON}
                submission={submission}
              />

              <ButtonGroup>
                <Button className="btn secondary" onClick={this.handleSubmitQuote}>Get Quote</Button>
                <Button className="btn" onClick={this.handleCancelDialog}>Cancel</Button>
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
              
              <br/>

              <ButtonGroup>
                <Button className="btn secondary" onClick={this.handleValidationOk}>Return to the Form</Button>
              </ButtonGroup>
            </div>

        </DialogBox>

      </div>
    );
  }

}

export default connect((store)=>{
  const submission = store.app.submission

  return({
    submission,
    ratingProduct: ratingProducts[submission.type]
  })
})(Form);