import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'
import config from '../../../../config'
import PendingStatus from '../pendingStatus'
import * as actions from '../../../actions/submissionActions'
import { trimAssetLink } from './../../../utils/utilities'

export class Knockout extends Component {
  componentDidMount() {
    this.props.clearSubmissionStatus()
  }
  render() {
    
    const assetsURL = trimAssetLink(config.assetsURL)

    const emailStatusMap = {
      LOADING: <div className="emailStatus">
        <img alt="loader" src={`${assetsURL}/images/ajax-loader.gif`} />
        <p>Emails Currently Being Processed</p>
        <span>From there, all forms needed will be sent to argo and your inbox.</span>
      </div>,
      ERROR: <div className="emailStatus error">
        <p>There appears to be something wrong.</p>
        <span>Please contact us to complete this transaction.</span>
      </div>,
      SUCCESS: <div className="emailStatus success">
        <img alt="thubms up" src={`${assetsURL}/images/thumbs-up.png`} />
        <p>Your submission forms have been successfully processed.</p>
        <span>Please check your your inbox. Thank you for using Argo Limited.</span>
      </div>
    }

    const { reason } = this.props.ratings[this.props.submission.type]
    const reasonDisplay = reason.map((r, idx) => (
      <div key={idx} className="reason"> {r}</div>
    ))

    const underwriters = config.underwriters.map((uw, idx)=> (
      <li key={idx}>{uw.name} – {uw.position} – {uw.location} - {uw.phone}</li>
    ))

    if (this.props.submission.clearanceStatus === 'pending') {
      return (<PendingStatus />)
    }

    return (
      <form>
        <h3>We are reviewing your Submission.</h3>

        <div className="content">
          <p>Based on your answers, we couldn&apos;t provide you with a
            instant pricing indication for the following reasons:</p>

          <div className="reasons">
            { reasonDisplay }
          </div>

          <p>One of our underwriters will be in contact with you to
            finalize your coverage options and assist you with purchase.</p>

          <ul>
            {underwriters}
          </ul>
        </div>

        { emailStatusMap[this.props.emailStatus] }

        <ButtonGroup>
          <LinkContainer to="/submissions">
            <Button className="btn"> Return to Submissions</Button>
          </LinkContainer>
        </ButtonGroup>

      </form>
    )
  }
}

Knockout.propTypes = {
  clearSubmissionStatus: PropTypes.func,
  emailStatus: PropTypes.string,
  submission: PropTypes.object,
  ratings: PropTypes.object
}

export default connect(null, actions)(Knockout)