import React, { Component, PropTypes } from 'react'

import { LinkContainer } from 'react-router-bootstrap'
import * as actions from 'app/actions/userActions'
import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'

import config from 'config'
import {
  saveSubmission,
  sendEmail,
  getRating 
} from 'app/actions/submissionActions'

class Loading extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { submission, user } = this.props

    const typeMap = {
      oi: [submission],
      ocp: [submission, Object.assign({}, submission, { type: 'oi' })]
    }

    const ratingPromises = typeMap[submission.type]
    const sgsEmail = submission.type === 'oi' ? config.sgsOIEmail : config.sgsOCPEmail
    const brokerEmail = submission.contactInfo.email
    const { argoEmail } = config
    const { ownerEdgeEmail } = config

    Promise.all(ratingPromises.map(s => (
      getRating({ submission: s }, user)
    ))).then((resp) => {
      const ratings = {}

      ratingPromises.map((ratingSubmission, idx) => {
        if (resp[idx].status === 'authError') {
          return this.props.logout()
        }
        const responseRatings = JSON.parse(resp[idx].data)

        ratings[ratingSubmission.type] = responseRatings.results
      })

      const submissionData = Object.assign({}, submission)
      submissionData.rating = ratings // adding rating to submission
      submissionData.broker = this.props.user.broker // adding broker to  submission

      saveSubmission(submissionData, user).then((respSave) => {
        if (respSave.status === 'authError') {
          this.props.logout()
        }

        if (respSave.data && respSave.data.success === true) {
          const { submissionId } = respSave.data
          const mainRating = ratings[submission.type]
          const { instantQuote } = mainRating

          let emailPromises

          // if this is an update instead of a new submission
          console.log('instantQuote', instantQuote)

          if (respSave.updated === true) {
            emailPromises = [
              sendEmail(argoEmail, (instantQuote) ? 'updatedQuotedArgo' : 'updatedNonQuoteArgo', submissionId, user),
              sendEmail(sgsEmail, (instantQuote) ? 'updatedQuotedArgo' : 'updatedNonQuoteArgo', submissionId, user),
              sendEmail(brokerEmail, (instantQuote) ? 'updatedQuotedBroker' : 'updatedNonQuoteBroker', submissionId, user)
            ]
          } else {
            emailPromises = [
              sendEmail(argoEmail, (instantQuote) ? 'quotedArgo' : 'nonQuoteArgo', submissionId, user),
              sendEmail(sgsEmail, (instantQuote) ? 'quotedArgo' : 'nonQuoteArgo', submissionId, user),
              sendEmail(brokerEmail, (instantQuote) ? 'quotedBroker' : 'nonQuoteBroker', submissionId, user),
              sendEmail(ownerEdgeEmail, (instantQuote) ? 'updatedQuotedBroker' : 'updatedNonQuoteBroker', submissionId, user)
            ]
          }

          // if (config.env === "prod")
          sendEmail(ownerEdgeEmail, (instantQuote) ? 'updatedQuotedBroker' : 'updatedNonQuoteBroker', submissionId, user)

          Promise.all(emailPromises).then(() => {
            this.props.handleEmailStatus({ success: true })
          })
        } else {
          alert('Submission saveSave not successful. Please contact support!')
        }
      }).catch((error1) => {
        console.log('ERROR IN SAVE SUBMISSION xx22', error1)
      })

      this.props.handleSubmit(!(resp[0].status === 200), ratings)
    }, (err) => {
      console.log('CONSOLE LOG ERR', err)
    })
  }

  render() {
    return (
      <form>
        <h3>Calculating Quote</h3>
        <h4>Please wait while we calculate.</h4>

        <div className="loadingImg">
          <img src="https://s3.amazonaws.com/ownersedge-cdn/images/ajax-loader.gif" />
        </div>

        <ButtonGroup>
          <LinkContainer to="/submissions">
            <Button className="btn"> Return to Submissions</Button>
          </LinkContainer>
        </ButtonGroup>
      </form>
    )
  }
}

Loading.propTypes = {
  logout: PropTypes.func.isRequired,
  handleEmailStatus: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}


export default connect((store) => {
  return ({
    user: store.user
  })
}, actions)(Loading)