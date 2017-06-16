import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from 'app/actions/submissionActions'
import SubmissionView from './View'
import Moment from 'moment'

class Submissions extends Component {
  componentDidMount() {
    this.props.clearSubmissionStatus()
    this.props.getSubmissions2(this.props.user)
  }

  render() {
    return (
      <div className="submissions">
        {this.props.submissions &&
          <SubmissionView
            dispatch={this.props.dispatch}
            submissionData={this.props.submissions}
          />}
      </div>
    )
  }
}

export default connect((store) => {
  return {
    user: store.user,
    submissions: store.submissions.data,
  }
}, actions)(Submissions)
