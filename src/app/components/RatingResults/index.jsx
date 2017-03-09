import React from 'react';

import styles from './styles';

import ToggleDisplay from 'components/shared/ToggleDisplay';

import { commifyNumber, isDefined } from 'app/utils/utilities';

function RatingResults(props) {
  const {
    location: {
      state: {
        submission,
        email
      }
    }
  } = props;

  return (
    <div className="RatingResults__container">
      <h3>Quote Results</h3>

      <ToggleDisplay
        show={submission.instantQuote}
        render={() => (
          <div>
            <ToggleDisplay
              show={isDefined(submission.ocpPremium) && isDefined(submission.ocpPremium.quotedPremium) && submission.ocpPremium.quotedPremium >= 0}
              render={() => (
                <div>
                  <span> Owners/Contractors - {`${JSON.stringify(submission.ocpPremium.limitsRequested[0])}`}</span>
                  <div className="premium-details">
                    <div className="premium-number">
                      Total Premium
                    <span>{`$${commifyNumber(submission.ocpPremium.quotedPremium + submission.ocpPremium.terrorPremium)}`}</span>
                  </div>
                  <div className="premium-number">
                      Base Premium
            <span>{`$${commifyNumber(submission.ocpPremium.quotedPremium)}`}</span>
                    </div>
                    <div className="premium-number">
                      Terrorism Coverage
            <span>{`$${commifyNumber(submission.ocpPremium.terrorPremium)}`}</span>
                    </div>
                  </div>
                  <p>for more comprehensive coverage, an Owner's Interest policy might fit your needs. For your convenience, see your pricing below:</p>
                </div>)}
            />

            <span>Owner's Interest - $1,000,000/2,000,000/2,000,000</span>
            <div className="premium-details">
              <div className="premium-number">
                Total Premium
                <span>{`$${commifyNumber(submission.oiPremium.totalPremium)}`}</span>
              </div>
              <div className="premium-number">
                Base Premium
                <span>{`$${commifyNumber(submission.oiPremium.quotedPremium)}`}</span>
              </div>
              <div className="premium-number">
                Additional Coverage
                <span>{`$${commifyNumber(submission.oiPremium.additionalCoverage)}`}</span>
              </div>
              <div className="premium-number">
                Terrorism Coverage
                <span>{`$${commifyNumber(submission.oiPremium.terrorPremium)}`}</span>
              </div>
            </div>
            <p>* $325 inspection fee not included</p>

          <ToggleDisplay
            show={isDefined(submission.oiPremium.excessQuotedPremium) && submission.oiPremium.excessQuotedPremium > 0}
            render={() => (
              <div>
                <span> {`$${commifyNumber(submission.oiPremium.excessDetails.limits)}`} Excess</span>
                <div className="premium-details">
                  <div className="premium-number">
                    Total Premium
                      <span>{`$${commifyNumber(submission.oiPremium.excessTotalPremium)}`}</span>
                  </div>
                  <div className="premium-number">
                    Base Premium
                      <span>{`$${commifyNumber(submission.oiPremium.excessQuotedPremium)}`}</span>
                  </div>
                  <div className="premium-number">
                    Terrorism Coverage
                      <span>{`$${commifyNumber(submission.oiPremium.excessTerror)}`}</span>
                  </div>
                </div>
              </div>)}
          />

          <p>Please check your email for a more detailed pricing indication and review it for accuracy.</p>

          <p>One of our underwriters will be in contact with you to finalize your coverage options and assist you with purchase</p>

          <ul>
            <li>Jessica Buelow – Supervisor – New York - 212-607-8829</li>
          </ul>
      <div className="legalText">
        The "pricing indication" is issued as a matter of information only  and does not confer any rights upon the insured or constitute a contract between <br /> Colony Specialty and the authorized representative or producer of the insured or the insured.
      </div>
  </div>
    )}/>

  <ToggleDisplay
    show = {!submission.instantQuote}
    render = {() => (
      <div>
        <h1 className="header-larger">We’re reviewing your submission!</h1>
        <p>Based on your answers, we couldn't provide you with an instant quote.</p>
        <p>One of our underwriters will be in contact with you to finalize your coverage options and assist you with purchase.</p>
      </div>
    )}
  />
    </div >
  );
}

export default RatingResults;
