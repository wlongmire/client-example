import React, { Component, PropTypes } from 'react'

import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'

import ToggleDisplay from 'app/components/shared/ToggleDisplay'
import { commifyNumber } from 'app/utils/utilities'
import classNames from 'classnames'
import * as actions from '../../../actions/submissionActions'
import PendingStatus from '../pendingStatus'

import ratingProducts from 'config/RatingProducts'
import config from '../../../../config'

class QuoteBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      title, className, totalPremium, basePremium, terrorismCoverage, additionalCoverage
    } = this.props

    const typeList = [
        { title: 'Total Premium', value: totalPremium },
        { title: 'Base Premium', value: basePremium },
        { title: 'Additional Coverage', value: additionalCoverage },
        { title: 'Terrorism Coverage', value: terrorismCoverage }
    ]

    const quoteValues = typeList.map((item, idx) => (
      <ToggleDisplay
        key={idx}
        show={item.value && item.value > 0}
        render={() => (
          <div className="premiumNumber">
            {item.title}
            <span>${commifyNumber(item.value || 0)}</span>
          </div>)
        }
      />
    ))

    return (
      <div className={classNames('quoteBlock', className)}>
        <h4>{title}</h4>
        { quoteValues }
      </div>)
  }
}

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

    console.log("RATINGS ====>", ratings)
    console.log("SUBMISSION ====>", submission)
    console.log("EMAIL STATUS", this.props.emailStatus)

    const rating = ratings[submission.type]
    const ratingProduct = ratingProducts[submission.type]

    const emailStatusMap = {
      LOADING: <div className="emailStatus">
        <img alt="loading" src={`${config.assetsURL}/images/ajax-loader.gif`} />
        <p>Emails/Submission Forms Currently Being Processed</p>
        <span>From there, all forms needed will be sent to argo and your inbox.</span>
      </div>,
      ERROR: <div className="emailStatus error">
        <p>There appears to be something wrong.</p>
        <span>Please contact us to complete this transaction.</span>
      </div>,
      SUCCESS: <div className="emailStatus success">
        <img alt="thumbs up" src={`${config.assetsURL}/images/thumbs-up.png`} />
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
        <h3>Instant Pricing Indication:</h3>
        <div className="quoteBlocks">
          {Object.keys(ratings).map((type) => {
            let mainTitle = ''
            let excessTitle = ''
            let pricingClass = ''

            if (submission.type == 'ocp' && type == 'oi') {
              mainTitle = "Here is what you would pay with an Owner's Interest Policy"
              excessTitle = 'Excess'
              pricingClass = 'upsell'
            } else if (this.props.user.bundles.length > 0 && submission.type == 'oi') {
              pricingClass = 'primaryPricing'
              const bundleInfo = this.props.user.bundles.filter((item) => { return item.id == type })[0]
              mainTitle = bundleInfo ? `${ratingProduct.name} (${bundleInfo.pricingSummaryContent})` : `${ratingProduct.name} (standard rate)`
              excessTitle = bundleInfo ? `Excess (${bundleInfo.pricingSummaryContent})` : 'Excess'
            } else if (this.props.user.bundles.length > 0 && submission.type == 'ocp') {
              pricingClass = 'primaryPricing'
              const bundleInfo = this.props.user.bundles.filter((item) => { return item.id == type })[0]
              mainTitle = bundleInfo ? `${ratingProduct.name} (${bundleInfo.pricingSummaryContent})` : `${ratingProduct.name}`
            } else {
              pricingClass = 'primaryPricing'
              mainTitle = `${ratingProduct.name}`
              excessTitle = 'Excess'
            }


            return (
              <div>
                <QuoteBlock
                  title={mainTitle}
                  className={classNames(ratingProduct.type, pricingClass)}
                  basePremium={ratings[type].premium}
                  totalPremium={ratings[type].totalPremium}
                  additionalCoverage={ratings[type].additionalCoverage}
                  terrorismCoverage={ratings[type].terrorPremium}
                />

                <ToggleDisplay
                  show={ratings[type].excessPremium > 0}
                  render={() => (
                    <QuoteBlock
                      title={excessTitle}
                      className="excess"
                      basePremium={ratings[type].excessPremium}
                      totalPremium={ratings[type].totalExcessPremium}
                      terrorismCoverage={ratings[type].excessTerrorPremium}
                    />)
                  }
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