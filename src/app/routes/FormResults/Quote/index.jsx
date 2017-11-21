import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'
import ToggleDisplay from 'app/components/shared/ToggleDisplay'
import classNames from 'classnames'
import * as actions from '../../../actions/submissionActions'
import PendingStatus from '../pendingStatus'
import { trimAssetLink } from './../../../utils/utilities'

import ratingProducts from '../../../../config/RatingProducts'
import config from '../../../../config'
import QuoteBlockC from '../QuoteBlock'

export class Quote extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.clearSubmissionStatus()
  }

  render() {
    const { ratings, submission } = this.props

    const rating = ratings[submission.type]
    const ratingProduct = ratingProducts[submission.type]

    const assetsURL = trimAssetLink(config.assetsURL)

    const emailStatusMap = {
      LOADING: <div className="emailStatus">
        <img alt="loading" src={`${assetsURL}/images/ajax-loader.gif`} />
        <p>Emails/Submission Forms Currently Being Processed</p>
        <span>From there, all forms needed will be sent to argo and your inbox.</span>
      </div>,
      ERROR: <div className="emailStatus error">
        <p>There appears to be something wrong.</p>
        <span>Please contact us to complete this transaction.</span>
      </div>,
      SUCCESS: <div className="emailStatus success">
        <img alt="thumbs up" src={`${assetsURL}/images/thumbs-up.png`} />
        <p>Your submission forms have been successfully processed.</p>
        <span>The appropriate forms should appear in your inbox within the next minute.
          Thank you for using Argo Limited.</span>
      </div>
    }

    const underwriters = config.underwriters.map((uw, idx) => (
      <li key={idx}>{uw.name} – {uw.position} – {uw.location} - {uw.phone}</li>
    ))

    if (submission.clearanceStatus === 'pending') {
      return (<PendingStatus />)
    }

    return (
      <div>
        <h3>Pricing Indication:</h3>
        <div className="quoteBlocks">
          {Object.keys(ratings).map((type) => {
            let mainTitle = ''
            let pricingClass = ''
            let productTitle = ''

            if (submission.type == 'ocp' && type == 'oi') {
              mainTitle = "Here is what you would pay with an Owner's Interest Policy"
              productTitle = "Owner's Interest"
              pricingClass = 'upsell'
            } else if (this.props.user.bundles.length > 0 && submission.type == 'oi') {
              productTitle = ratingProduct.name
              pricingClass = 'primaryPricing'
              const bundleInfo = this.props.user.bundles.filter((item) => { return item.id == type })[0]
              mainTitle = bundleInfo ? `${bundleInfo.pricingSummaryContent}` : 'Standard rate'
            } else if (this.props.user.bundles.length > 0 && submission.type == 'ocp') {
              productTitle = ratingProduct.name
              pricingClass = 'primaryPricing'
              const bundleInfo = this.props.user.bundles.filter((item) => { return item.id == type })[0]
              mainTitle = bundleInfo ? `${bundleInfo.pricingSummaryContent}` : `${ratingProduct.name}`
            } else {
              productTitle = ratingProduct.name
              pricingClass = 'primaryPricing'
              mainTitle = null
            }


            return (
              <div>
                <QuoteBlockC
                  mainTitle={mainTitle}
                  productTitle={productTitle}
                  className={classNames(ratingProduct.type, pricingClass)}
                  ratings={ratings[type]}
                />
              </div>
            )
          })}
        </div>

        <div className="content">
          <p>One of the following underwriters will be in contact with you
            to finalize your coverage options and assist you with purchase.</p>
          <ul>{underwriters}</ul>
        </div>

        { emailStatusMap[this.props.emailStatus] }

        <div className="legalText">
          The &quot;pricing indication&quot; is issued as a matter of information only
          and does not confer any rights upon the insured or constitute a contract
          between Colony Specialty and the authorized representative or
          producer of the insured or the insured.
        </div>


        <ButtonGroup>
          <LinkContainer to="/submissions">
            <Button className="btn"> Return to Submissions</Button>
          </LinkContainer>
        </ButtonGroup>

      </div>
    )
  }
}

Quote.propTypes = {
  emailStatus: PropTypes.string,
  submission: PropTypes.object,
  user: PropTypes.object.isRequired,
  ratings: PropTypes.object,
  clearSubmissionStatus: PropTypes.func
}

export default connect((store) => {
  return ({
    user: store.user
  })
}, actions)(Quote)