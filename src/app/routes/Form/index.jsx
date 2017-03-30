import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import {connect} from 'react-redux'
import { push } from 'react-router-redux'

import { LinkContainer } from 'react-router-bootstrap'
import { Button, ButtonGroup } from 'react-bootstrap';

import DialogBox from 'components/shared/DialogBox';
import ConfirmationModal from './ConfirmationModal';
import constants from 'app/constants/app'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmation:false,
      submission:{}
    };

    this.handleSubmitQuote = this.handleSubmitQuote.bind(this)
    this.handleCancelDialog = this.handleCancelDialog.bind(this);
  }

  componentDidMount(){
    const { CHANGE_SUBMISSION_STATUS, SUBMISSION_STATUS } = constants
    this.props.dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.CREATING })
  }

  handleSubmitQuote() {
    const { CHANGE_SUBMISSION } = constants
    this.props.dispatch({ type:CHANGE_SUBMISSION, submission:Object.assign(this.state.submission, {status:"QUOTE"}) })

    this.props.dispatch(push("/formResults"));
    this.setState({confirmation:false})
  }

  handleCancelDialog() {
    this.setState({confirmation:false})
  }

  render() {
    const submission={}

    return (
      <div className='page productChoice'>
          <h3>Fill out the rest of the details</h3>
          
          <ButtonGroup>
            <Button
              onClick={ ()=>{ this.setState({confirmation:true}) } }
              className="btn secondary">
              Review Submission
            </Button>

            <LinkContainer to="/submissions">
                <Button className="btn">Return to Submissions</Button>
            </LinkContainer>
        </ButtonGroup>
        
        <DialogBox
            custom_class="confirmationDialog"
            title="Is your data correct?"
            subtitle="Double check your values and push Get Quote to confirm"
            show={this.state.confirmation}
            >
            <div>
              <ConfirmationModal submission={submission} />

              <ButtonGroup>
                <Button className="btn secondary" onClick={this.handleSubmitQuote}>Get Quote</Button>
                <Button className="btn" onClick={this.handleCancelDialog}>Cancel</Button>
              </ButtonGroup>
            </div>

          </DialogBox>
      </div>
    );
  }

}

export default connect((store)=>{
  return({
    submissiom:store.app.submission
  })
})(Form);