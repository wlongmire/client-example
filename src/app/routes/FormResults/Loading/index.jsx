import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { LinkContainer } from 'react-router-bootstrap'
import * as actions from 'app/actions/userActions'
import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'
import { trimAssetLink } from './../../../utils/utilities'

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
    const { argoEmail, ownerEdgeEmail } = config

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
      submissionData.pricingSatus = instantQuote ? 'priced': 'referred';

      saveSubmission(submissionData, user).then((respSave) => {
        if (respSave.status === 'authError') {
          console.log('Save Sub error: ', resp)
          this.props.logout()
        }

        if (respSave.data && respSave.data.success === true) {
          const { submissionId } = respSave.data


          let emailPromises

          // if clearance status is passing
          if (submissionData.clearanceStatus === 'pass') {
            // if submission request is an update
            if (respSave.updated === true) {
              emailPromises = [
                sendEmail(argoEmail, (instantQuote) ? 'updatedQuotedArgo' : 'updatedNonQuoteArgo', submissionId, user),
                sendEmail(sgsEmail, (instantQuote) ? 'updatedQuotedArgo' : 'updatedNonQuoteArgo', submissionId, user),
                sendEmail(brokerEmail, (instantQuote) ? 'updatedQuotedBroker' : 'updatedNonQuoteBroker', submissionId, user),
                sendEmail(ownerEdgeEmail, (instantQuote) ? 'updatedQuotedBroker' : 'updatedNonQuoteBroker', submissionId, user),
              ]
            // if it is a new submission
            } else {
              emailPromises = [
                sendEmail(argoEmail, (instantQuote) ? 'quotedArgo' : 'nonQuoteArgo', submissionId, user),
                sendEmail(sgsEmail, (instantQuote) ? 'quotedArgo' : 'nonQuoteArgo', submissionId, user),
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
                sendEmail(sgsEmail, (instantQuote) ? 'pendingUpdatedArgo' : 'pendingUpdatedNonQuoteArgo', submissionId, user),
                sendEmail(ownerEdgeEmail, (instantQuote) ? 'pendingUpdatedArgo' : 'pendingUpdatedNonQuoteArgo', submissionId, user)
              ]
            // if it is a new submission
            } else {
              emailPromises = [
                sendEmail(argoEmail, (instantQuote) ? 'pendingArgo' : 'pendingNonQuoteArgo', submissionId, user),
                sendEmail(sgsEmail, (instantQuote) ? 'pendingArgo' : 'pendingNonQuoteArgo', submissionId, user),
                sendEmail(ownerEdgeEmail, (instantQuote) ? 'pendingUpdatedArgo' : 'pendingUpdatedNonQuoteArgo', submissionId, user)
              ]
            }
          }

          Promise.all(emailPromises).then((r) => {
            this.props.handleEmailStatus({ success: true })
          }).catch((e)=>{
            console.log('Email error: ', e)
          })
        } else {
          alert('Submission save not successful. Please contact support!')
        }
      }).catch((error1) => {
        console.log('save sub error 2', error1)
      })

      this.props.handleSubmit(!(resp[0].status === 200), ratings)
    }, (err) => {
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
  submission: PropTypes.object
}


export default connect((store) => {
  return ({
    user: store.user
  })
}, actions)(Loading)