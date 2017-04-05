import React, { Component, PropTypes } from 'react'

import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'

import ToggleDisplay from 'components/shared/ToggleDisplay';
import { commifyNumber, isDefined } from 'app/utils/utilities';


import ratingProducts from 'config/RatingProducts'

class Quote extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {rating, submission} = this.props;

        console.log("submission", submission);
        console.log("rating", rating);

        const currentProduct = ratingProducts[submission.type]
        const totalPremium = commifyNumber(rating.totalPremium || 0)
        const basePremium = commifyNumber(rating.premium || 0)
        const additionalCoverage = commifyNumber(rating.additionalCoverage || 0)
        const terrorismCoverage = commifyNumber(rating.terrorPremium || 0)

        // const excessLimits = 
        const excessTotalPremium = commifyNumber(rating.excessTerrorPremium || 0)
        const excessQuotedPremium = commifyNumber(rating.totalExcessPremium || 0)
        const excessTerror = commifyNumber(rating.excessPremium || 0)

        return (
        <div>
            <h3>Here is your Instant Quote!</h3>
            
            <div>
                {/*<span> Owners/Contractors - {`${JSON.stringify(submission.ocpPremium.limitsRequested[0])}`}</span>  */}
                <div> {currentProduct.name}</div>

                <div className="premium-number">
                    Total Premium
                    <span>{totalPremium}</span>
                </div>

                <div className="premium-number">
                    Base Premium
                    <span>{basePremium}</span>
                </div>

                <ToggleDisplay
                show={submission.type === "oi"}
                render={() => (
                    <div className="premium-number">
                        Terrorism Coverage
                        <span>{terrorismCoverage}</span>
                    </div>
                )}/>

                <div className="premium-number">
                    Terrorism Coverage
                    <span>{terrorismCoverage}</span>
                </div>

            </div>

            <ToggleDisplay
            show={excessTotalPremium > 0}
            render={() => (
                <div>
                    {/*{`$${commifyNumber(submission.oiPremium.excessDetails.limits)}`}*/}
                    <span>Excess</span>

                    <div className="premium-number">
                        Total Premium <span>{excessTotalPremium}</span>
                    </div>

                    <div className="premium-number">
                        Base Premium <span>{excessQuotedPremium}</span>
                    </div>

                    <div className="premium-number">
                        Terrorism Coverage <span>{excessTerror}</span>
                    </div>
                </div>)}/>

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