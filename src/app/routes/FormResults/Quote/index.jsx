import React, { Component } from 'react'

import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'

import ToggleDisplay from 'components/shared/ToggleDisplay'
import { commifyNumber } from 'app/utils/utilities'
import classNames from 'classnames'

import ratingProducts from 'config/RatingProducts'
import config from 'config'

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

class Quote extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { ratings, submission } = this.props

    const rating = ratings[submission.type]
    const ratingProduct = ratingProducts[submission.type]

    const emailStatusMap = {
      LOADING: <div className="emailStatus">
        <img src="https://s3.amazonaws.com/ownersedge-cdn/images/ajax-loader.gif" />
        <p>Emails/Submission Forms Currently Being Processed</p><span>From there, all forms needed will be sent to argo and your inbox.</span>
      </div>,
      ERROR: <div className="emailStatus error">
        <p>There appears to be something wrong.</p>
        <span>Please contact us to complete this transaction.</span>
      </div>,
      SUCCESS: <div className="emailStatus success">
        <img src="https://s3.amazonaws.com/ownersedge-cdn/images/thumbs-up.png" />
        <p>Your submission forms have been successfully processed.</p>
        <span>The approparte forms should appear in your inbox within the next minute. Thank you for using Argo Limited.</span>
      </div>
    }

    const underwriters = config.underwriters.map((uw, idx) => (
      <li key={idx}>{uw.name} – {uw.position} – {uw.location} - {uw.phone}</li>
    ))

    return (
      <div>
        <h3>Instant Pricing Indication:</h3>
        <div className="quoteBlocks">
          <QuoteBlock
            title={ratingProduct.name}
            className={classNames(ratingProduct.type, 'primaryPricing')}
            basePremium={rating.premium}
            totalPremium={rating.totalPremium}
            additionalCoverage={rating.additionalCoverage}
            terrorismCoverage={rating.terrorPremium}
          />

          <ToggleDisplay
            show={rating.excessPremium > 0}
            render={() => (
              <QuoteBlock
                title="Excess"
                className="excess"
                basePremium={rating.excessPremium}
                totalPremium={rating.totalExcessPremium}
                terrorismCoverage={rating.excessTerrorPremium}
              />)
            }
          />

          <ToggleDisplay
            show={submission.type === 'ocp'}
            render={() => (
              <div>
                <QuoteBlock
                  title={"Here is what you would pay with an Owner's Interest Policy"}
                  className="oi upsell"
                  basePremium={ratings.oi.premium}
                  totalPremium={ratings.oi.totalPremium}
                  additionalCoverage={ratings.oi.additionalCoverage}
                  terrorismCoverage={ratings.oi.terrorPremium}
                />
              </div>)
            }
          />
        </div>

        <div className="content">
          <p>One of our following underwriters will be in contact with you to finalize your coverage options and assist you with purchase.</p>
          <ul>{underwriters}</ul>
        </div>

        { emailStatusMap[this.props.emailStatus] }

        <div className="legalText">
          The "pricing indication" is issued as a matter of information only  and does not confer any rights upon the insured or constitute a contract between Colony Specialty and the authorized representative or producer of the insured or the insured.
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

export default connect()(Quote)