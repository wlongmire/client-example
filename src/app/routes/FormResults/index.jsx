import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import {connect} from 'react-redux'
import { push } from 'react-router-redux'

import { LinkContainer } from 'react-router-bootstrap'
import { Button, ButtonGroup } from 'react-bootstrap';

import Loading from './Loading'
import Error from './Error'
import Quote from './Quote'
import Knockout from './Knockout'

import constants from 'app/constants/app'

const STATUS = {
  LOADING: "LOADING",
  ERROR:"ERROR",
  QUOTE: "QUOTE",
  KNOCKOUT: "KNOCKOUT"
}

class FormResults extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: STATUS.LOADING,
      rating: {}
    };

    this.handleLoadComplete = this.handleLoadComplete.bind(this);
  }

  componentDidMount(){
    const { CHANGE_SUBMISSION_STATUS, SUBMISSION_STATUS } = constants
    this.props.dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.QUOTE })
  }

  handleLoadComplete(error, rating) {
    this.setState({
      status: (error)?STATUS.ERROR:((rating.instantQuote)?STATUS.QUOTE:STATUS.KNOCKOUT),
      rating
    })
  }

  render() {

    const subcomponentMap = {
      "LOADING":  <Loading  handleSubmit={this.handleLoadComplete} submission={this.props.submission}/>,
      "ERROR":    <Error/>,
      "QUOTE":    <Quote/>,
      "KNOCKOUT": <Knockout/>
    };

    return (
      <div className='page formResults'>
          {
            subcomponentMap[this.state.status]
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