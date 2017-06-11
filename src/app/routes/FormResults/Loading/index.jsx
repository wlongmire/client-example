import React, { Component } from 'react'

import { LinkContainer } from 'react-router-bootstrap'

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
    const argoEmail = config.argoEmail
    const sgsEmail = submission.type === 'oi' ? config.sgsOIEmail : config.sgsOCPEmail
    const brokerEmail = submission.contactInfo.email
    // AK_TO_DO 
    console.log('typeMap xx22', typeMap)
    console.log('ratingPromises xx22', ratingPromises)
    console.log('submission defintion xx22', submission)

    Promise.all(ratingPromises.map(s => (
      getRating({ submission: s, user })
    ))).then((resp) => {
      console.log("RESPONSE FROM GET RATING", resp)
      const ratings = {}
      ratingPromises.map((ratingSubmission, idx) => {
        ratings[ratingSubmission.type] = resp[idx].rating
      })

      const submissionData = Object.assign({}, submission)
      submissionData.rating = ratings

      // AK_TO_DO
      saveSubmission(submissionData).then((resp) => {
        if (resp.success) {
          const {submissionId} = resp
          const mainRating = ratings[submission.type]
          const { instantQuote } = mainRating

          const emailPromises = [
            sendEmail(argoEmail, (instantQuote) ? 'quotedArgo' : 'nonQuoteArgo', submissionId),
            sendEmail(sgsEmail, (instantQuote) ? 'quotedArgo' : 'nonQuoteArgo', submissionId),
            sendEmail(brokerEmail, (instantQuote) ? 'quotedBroker' : 'nonQuoteBroker', submissionId)
          ]

          Promise.all(emailPromises).then((resp) => {
            this.props.handleEmailStatus({ success: true })
          })
        } else {
            alert('Submission saveSave not successful')
        }
      }).catch(() => {
        alert('Not able to get rating.')
      })

      this.props.handleSubmit(!resp[0].success, ratings)
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

export default connect((store) => {
  return ({
    user: store.user
  })
})(Loading)