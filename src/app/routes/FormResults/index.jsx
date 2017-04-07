import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import {connect} from 'react-redux'
import { push } from 'react-router-redux'

import { LinkContainer } from 'react-router-bootstrap'
import { Button, ButtonGroup } from 'react-bootstrap';
import ToggleDisplay from 'components/shared/ToggleDisplay';

import Loading from './Loading'
import Error from './Error'
import Quote from './Quote'
import Knockout from './Knockout'

import constants from 'app/constants/app'

const STATUS = {
  LOADING: "LOADING",
  ERROR:"ERROR",
  QUOTE: "QUOTE",
  KNOCKOUT: "KNOCKOUT",
  SUCCESS: "SUCCESS"
}

class FormResults extends Component {
  constructor(props) {
    super(props)

    this.state = {
      quoteStatus: STATUS.LOADING,
      emailStatus: STATUS.LOADING,
      ratings: {}
    };

    this.handleLoadComplete = this.handleLoadComplete.bind(this);
    this.handleEmailStatus = this.handleEmailStatus.bind(this);
  }

  componentWillMount(){
    if (!this.props.submission)
      this.props.dispatch(push('/productChoice'));
  }

  componentDidMount(){
    const { CHANGE_SUBMISSION_STATUS, SUBMISSION_STATUS } = constants
    this.props.dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.QUOTE })
  }

  handleEmailStatus(result) {
    this.setState({
      emailStatus: (result.success)?STATUS.SUCCESS:STATUS.ERROR
    })
  }

  handleLoadComplete(error, ratings) {
    const {submission} = this.props;

    this.setState({
      quoteStatus: (error)?STATUS.ERROR:((ratings[submission.type].instantQuote)?STATUS.QUOTE:STATUS.KNOCKOUT),
      ratings
    })
  }

  render() {
    console.log("THIS PROPS RATINGS", this.state.ratings);
    const subcomponentMap = {
      "LOADING":  <Loading  handleSubmit={this.handleLoadComplete} handleEmailStatus={this.handleEmailStatus} submission={this.props.submission}/>,
      "ERROR":    <Error/>,
      "QUOTE":    <Quote submission={this.props.submission} emailStatus={this.state.emailStatus} ratings={this.state.ratings}/>,
      "KNOCKOUT": <Knockout emailStatus={this.state.emailStatus}/>
    };

    return (
      <div className='page formResults'>
          {
            subcomponentMap[this.state.quoteStatus]
          }
      </div>
    );
  }

}

export default connect((store)=>{

  return({
    submission:store.app.submission
  })
})(FormResults);