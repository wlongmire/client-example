import React, { Component, PropTypes } from 'react';
import {connect}  from 'react-redux';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import SubmissionView from './View';
import constants from 'app/constants/app';

class Submissions extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  componentDidMount() {
    const { CHANGE_SUBMISSION_STATUS, CLEAR_SUBMISSION, SUBMISSION_STATUS } = constants;

    this.props.dispatch({type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.NONE})
    this.props.dispatch({type: CLEAR_SUBMISSION})
  }

  render() {
    return (
      <div className='submissions'>
        <SubmissionView dispatch={this.props.dispatch}/>
      </div>
    );
  }
}

export default connect()(Submissions);
