import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import { push } from 'react-router-redux';

import { Button } from 'react-bootstrap'

import Input from './Input'
import Loading from './Loading'
import Error from './Error'
import Result from './Result'

import constants from 'app/constants/app'

const STATUS = {
  INPUT:"INPUT",
  LOADING: "LOADING",
  ERROR: "ERROR",
  RESULT: "RESULT"
}

class Clearance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: STATUS.INPUT,
      input: {},
      result: {}
    };

    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleLoadComplete = this.handleLoadComplete.bind(this);
    this.handleLoadCancel = this.handleLoadCancel.bind(this);
    this.handleClearance = this.handleClearance.bind(this);
  }

  componentWillMount(){
    const { CHANGE_SUBMISSION_STATUS, SUBMISSION_STATUS } = constants;
    this.props.dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.CLEARANCE })
  }
  
  handleInputSubmit(input) {
    this.setState({ status: STATUS.LOADING, input})
  }

  handleLoadComplete(error, result) {
    this.setState({ status: (error)?STATUS.ERROR:STATUS.RESULT, result })
  }

  handleLoadCancel() {
    this.setState({ status:STATUS.INPUT })
  }

  handleClearance(result) {
    if (result.success){

      const { CHANGE_SUBMISSION } = constants
      const submission = Object.assign(this.state.input, {passedClearance:true, status:"SUBMISSION"});

      this.props.dispatch({ type:CHANGE_SUBMISSION, submission })
      this.props.dispatch(push("/form"))
    } else {
      this.setState({ status: STATUS.INPUT })
    }
  }
  
  render() {
    const subcomponentMap = {
      "INPUT":    <Input    handleSubmit={this.handleInputSubmit}/>,
      "LOADING":  <Loading  handleSubmit={this.handleLoadComplete} handleCancel={this.handleLoadCancel} input={this.state.input}/>,
      "ERROR":    <Error/>,
      "RESULT":   <Result   handleSubmit={this.handleClearance} result={this.state.result}/>
    };

    return (
      <div className='page clearance'>
        {
          subcomponentMap[this.state.status]
        }
      </div>
    );
  }
}

export default connect((store)=>{
  return({
    submissiom:store.app.submission
  })
})(Clearance);