import React, { Component, PropTypes } from 'react'

import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'

import ToggleDisplay from 'components/shared/ToggleDisplay';
import { commifyNumber, isDefined } from 'app/utils/utilities';


import ratingProducts from 'config/RatingProducts'

class QuoteBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {
            title, totalPremium, basePremium, terrorismCoverage, additionalCoverage
        } = this.props;

        return (
            <div>
                <div>{title}</div>

                <div className="premium-number">
                    Total Premium
                    <span>{commifyNumber(totalPremium || 0)}</span>
                </div>

                <div className="premium-number">
                    Base Premium
                    <span>{commifyNumber(basePremium || 0)}</span>
                </div>

                <div className="premium-number">
                    Additional Coverage
                    <span>{commifyNumber(additionalCoverage || 0)}</span>
                </div>
        
                <div className="premium-number">
                    Terrorism Coverage
                    <span>{commifyNumber(terrorismCoverage || 0)}</span>
                </div>
            </div>)
    }
}

class Quote extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {ratings, submission} = this.props;

        const rating = ratings[submission.type];

        const type = submission.type
        const ratingProduct = ratingProducts[submission.type]
        
        return (
        <div>
            <h3>Here is your Instant Quote!</h3>
            <QuoteBlock 
                title={ratingProduct.name}
                basePremium={rating.premium}
                totalPremium={rating.totalPremium}
                additionalCoverage={rating.additionalCoverage}
                terrorismCoverage={rating.terrorismCoverage}
            />

            <ToggleDisplay
            show={rating.excessPremium > 0}
            render={() => (
                <QuoteBlock 
                    title="Excess"
                    basePremium={rating.excessPremium}
                    totalPremium={rating.totalExcessPremium}
                    terrorismCoverage={rating.excessTerrorPremium}
                />)}/>

            <p>Please check your email for a more detailed pricing indication and review it for accuracy.</p>
            <p>One of our underwriters will be in contact with you to finalize your coverage options and assist you with purchase</p>
            
            <p>Jessica Buelow – Supervisor – New York - 212-607-8829</p>
            
            <div className="legalText">
                The "pricing indication" is issued as a matter of information only  and does not confer any rights upon the insured or constitute a contract between <br /> Colony Specialty and the authorized representative or producer of the insured or the insured.
            </div>

            <ButtonGroup>
                <LinkContainer to="/submissions">
                    <Button className="btn"> Return to Submissions</Button>
                </LinkContainer>
            </ButtonGroup>

        </div>
        );
    }
}

export default connect()(Quote)