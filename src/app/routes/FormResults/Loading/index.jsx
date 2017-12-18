import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'
import { trimAssetLink } from './../../../utils/utilities'

import config from 'config'

import {
  saveSubmission,
  submissionCreateSuccess,
  submissionCreateFailed,
  submissionEditSuccess,
  submissionEditFailed,
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

    const bundleArray = []
    if (user.bundles.length > 0) {
      user.bundles.map((x, key) => {
        if (x.productType === 'oi') {
          // adding price bundle multiplier. also errasssing Excess Limit amount
          // since the bundle pricing should not count excesss premium
          bundleArray.push(Object.assign({}, submission, { type: 'oi', bundleMultiplier: x.basePremiumMulitplier, bundleId: x.id }))
        }
      })
    }

    const typeMap = {
      oi: [...bundleArray, submission],
      ocp: [submission, Object.assign({}, submission, { type: 'oi' })]
    }

    // AK_TO_DO UPDATE THE REQUESTS
    const ratingPromises = typeMap[submission.type]
    const sgsEmail = submission.type === 'oi' ? config.sgsOIEmail : config.sgsOCPEmail
    const brokerEmail = submission.contactInfo.email
    let { argoEmail, ownerEdgeEmail } = config

    if (argoEmail.indexOf('[') > -1) {
      argoEmail = JSON.parse(argoEmail);
    }

    Promise.all(ratingPromises.map(s => (
      getRating({ submission: s }, user)
    ))).then((resp) => {
      const ratings = {}

      ratingPromises.forEach((ratingSubmission, idx) => {
        if (resp[idx].status === 'authError') {
          return this.props.logout()
        }
        const responseRatings = resp[idx].data
        const ratingType = ratingSubmission.bundleId ? ratingSubmission.bundleId : ratingSubmission.type
        ratings[ratingType] = responseRatings.results
      })

      const submissionData = Object.assign({}, submission)
      submissionData.rating = ratings // adding rating to submission
      submissionData.brokerId = this.props.user.brokerId // adding broker to submission
      const mainRating = ratings[submission.type]
      const { instantQuote } = mainRating
      submissionData.pricingSatus = instantQuote ? 'priced' : 'referred'

      saveSubmission(submissionData, user).then((respSave) => {
        if (respSave.status === 'authError') {
          const error = new Error('Auth Error')
          if (submission.id) {
            this.props.dispatch(submissionEditFailed(error))
          } else {
            this.props.dispatch(submissionCreateFailed(error))
          }
          this.props.logout()
        }

        if (respSave.data && respSave.data.success === true) {
          if (submission.id) {
            this.props.dispatch(submissionEditSuccess(Object.assign({}, submission, { rating: ratings })))
          } else {
            const { submissionId } = respSave.data
            this.props.dispatch(submissionCreateSuccess(Object.assign({}, submission, { id: submissionId, rating: ratings })))
          }
          
          const { submissionId } = respSave.data
          let emailPromises

          // if clearance status is passing
          if (submissionData.clearanceStatus === 'pass') {
            // if submission request is an update
            if (respSave.updated === true) {
              emailPromises = [
                sendEmail(argoEmail, (instantQuote) ? 'updatedQuotedArgo' : 'updatedNonQuoteArgo', submissionId, user),
                sendEmail(sgsEmail, (instantQuote) ? 'updatedQuotedSGS' : 'updatedNonQuoteSGS', submissionId, user),
                sendEmail(brokerEmail, (instantQuote) ? 'updatedQuotedBroker' : 'updatedNonQuoteBroker', submissionId, user),
                sendEmail(ownerEdgeEmail, (instantQuote) ? 'updatedQuotedArgo' : 'updatedNonQuoteArgo', submissionId, user),
              ]
            // if it is a new submission
            } else {
              emailPromises = [
                sendEmail(argoEmail, (instantQuote) ? 'quotedArgo' : 'nonQuoteArgo', submissionId, user),
                sendEmail(sgsEmail, (instantQuote) ? 'quotedSGS' : 'nonQuoteSGS', submissionId, user),
                sendEmail(brokerEmail, (instantQuote) ? 'quotedBroker' : 'nonQuoteBroker', submissionId, user),
                sendEmail(ownerEdgeEmail, (instantQuote) ? 'quotedArgo' : 'nonQuoteArgo', submissionId, user)
              ]
            }
          // if clearance status is pending
          } else if (submissionData.clearanceStatus === 'pending') {
            // if submission request is an update
            if (respSave.updated === true) {
              emailPromises = [
                sendEmail(argoEmail, (instantQuote) ? 'pendingUpdatedArgo' : 'pendingUpdatedNonQuoteArgo', submissionId, user),
                sendEmail(sgsEmail, (instantQuote) ? 'pendingUpdatedSGS' : 'pendingUpdatedNonQuoteSGS', submissionId, user),
                sendEmail(ownerEdgeEmail, (instantQuote) ? 'pendingUpdatedArgo' : 'pendingUpdatedNonQuoteArgo', submissionId, user)
              ]
            // if it is a new submission
            } else {
              emailPromises = [
                sendEmail(argoEmail, (instantQuote) ? 'pendingArgo' : 'pendingNonQuoteArgo', submissionId, user),
                sendEmail(sgsEmail, (instantQuote) ? 'pendingSGS' : 'pendingNonQuoteSGS', submissionId, user),
                sendEmail(ownerEdgeEmail, (instantQuote) ? 'pendingUpdatedArgo' : 'pendingUpdatedNonQuoteArgo', submissionId, user)
              ]
            }
          }

          Promise.all(emailPromises).then((r) => {
            this.props.handleEmailStatus({ success: true })
          })
        } else {
          alert('Submission save not successful. Please contact support!')
        }
      })

      this.props.handleSubmit(!(resp[0].status === 200), ratings)
    }, (err) => {
      // TODO: actually handle the error or remove this handler altogether
      console.log('CONSOLE LOG ERR', err)
    })
  }

  render() {
    const assetsURL = trimAssetLink(config.assetsURL)

    return (
      <form>
        <h3>Calculating Quote</h3>
        <h4>Please wait while we calculate.</h4>

        <div className="loadingImg">
          <img alt="loading" src={`${assetsURL}/images/ajax-loader.gif`} />
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
  handleSubmit: PropTypes.func.isRequired,
  submission: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect((store) => {
  return ({
    user: store.user
  })
})(Loading)