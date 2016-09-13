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
      <ToggleDisplay
        show={isDefined(submission.quotedPremium) && submission.quotedPremium !== null}
        render={() => (
          <div>
          <div>
            <h1 className="header-larger">This submission qualifies for instant coverage</h1>

            <div className="premium-details">
              <div className="premium-number">
                Total Premium
                <span>{`$${commifyNumber(submission.totalPremium)}`}</span>
              </div>
              <div className="premium-number">
                Base Premium
                <span>{`$${commifyNumber(submission.quotedPremium)}`}</span>
              </div>
              <div className="premium-number">
                Additional Coverage
                <span>{`$${commifyNumber(submission.additionalCoverage)}`}</span>
              </div>
              <div className="premium-number">
                Terrorism Coverage
                <span>{`$${commifyNumber(submission.terrorPremium)}`}</span>
              </div>
               <div className="premium-number">
                Commission
                <span>{`${submission.commission.toFixed(2)} %`}</span>
              </div>
            </div>
            <p>* $325 inspection fee not included</p>

            <p>Please check your email for a more detailed pricing indication and review it for accuracy.</p>

            <p>One of our underwriters will be in contact with you to finalize your coverage options and assist you with purchase</p>

          </div>
          <div className="legalText">
            The "pricing indication" is issued as a matter of information only  and does not confer any rights upon the insured or constitute a contract between <br/> Colony Specialty and the authorized representative or producer of the insured or the insured.
          </div>
          </div>
        )}
      />
      <ToggleDisplay
        show={!isDefined(submission.quotedPremium) || submission.quotedPremium === null || submission.quotedPremium <= 0}
        render={() => (
          <div>
            <h1 className="header-larger">We’re reviewing your submission!</h1>
            <p>Based on your answers, we couldn't provide you with an instant quote.</p>
            <p>One of our underwriters will be in contact with you to finalize your coverage options and assist you with purchase.</p>
          </div>
        )}
      />
    </div>
  );
}

export default RatingResults;

            // <ToggleDisplay
            //   show={isDefined(submission.excessPremium) && submission.excessPremium !== null}
            //   render={ () => {
            //     <div className="premium-details">
            //     <div className="premium-number">
            //       Total Premium
            //       <span>{`$${commifyNumber(submission.totalPremium)}`}</span>
            //     </div>
            //     <div className="premium-number">
            //       Base Premium
            //       <span>{`$${commifyNumber(submission.quotedPremium)}`}</span>
            //     </div>
            //     <div className="premium-number">
            //       Additional Coverage
            //       <span>{`$${commifyNumber(submission.additionalCoverage)}`}</span>
            //     </div>
            //     <div className="premium-number">
            //       Terrorism Coverage
            //       <span>{`$${commifyNumber(submission.terrorPremium)}`}</span>
            //     </div>
            //     <div className="premium-number">
            //       Commission
            //       <span>{`${submission.commission.toFixed(2)} %`}</span>
            //     </div>
            // </div>
            //   }}
            // />