import React, { Component } from 'react'

import {connect}  from 'react-redux'
import Helmet from 'react-helmet'

import * as actions from 'src/app/actions/submissionActions'
import SubmissionView from './View'
import Moment from 'moment'

class Submissions extends Component {
  componentDidMount() {
    this.props.clearSubmissionStatus()
    
    this.props.getSubmissions(this.props.user.broker.id)
  }

  render() {
    return (
      <div className="submissions">
        {this.props.submissions.data &&
          <SubmissionView
            sumbissionData={this.props.submissions.data}
            dispatch={this.props.dispatch}
          />}
      </div>
    );
  }
}

export default connect((store) => {
  return {
    user: store.user,
    submissions: store.submissions
  }
}, actions)(Submissions)
