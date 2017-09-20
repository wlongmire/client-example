import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from './../../actions/submissionActions'
import SubmissionViewC from './View'

export class Submissions extends Component {
  componentDidMount() {
    this.props.clearSubmissionStatus()
    this.props.getSubmissions(this.props.user)
  }

  render() {
    return (
      <div className="submissions">
        {this.props.submissions &&
          <SubmissionViewC
            submissions={this.props.submissions}
          />}
      </div>
    )
  }
}

Submissions.propTypes = {
  clearSubmissionStatus: PropTypes.func.isRequired,
  getSubmissions: PropTypes.func.isRequired,
  submissions: PropTypes.array,
  user: PropTypes.object
}

export default connect((store) => {
  return {
    user: store.user,
    submissions: store.submissions.data,
  }
}, actions)(Submissions)
