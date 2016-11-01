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
        show={isDefined(submission.quotedPremium) && submission.quotedPremium !== null && submission.quotedPremium > 0}
        render={() => (
          <div>
          <div>
            <h1 className="header-larger">This submission qualifies for coverage</h1>

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
            <ToggleDisplay
              show={isDefined(submission.excessPremium) && submission.excessPremium !== null && submission.excessPremium > 0}
              render={ () => (
                <div className="premium-details">
                <div className="premium-number">
                  Excess Limits Requested
                  <span>{`$${commifyNumber(submission.excessDetails.limits)}`}</span>
                </div>
                <div className="premium-number">
                  Excess Premium
                  <span>{`$${commifyNumber(submission.excessPremium)}`}</span>
                </div>
                <div className="premium-number">
                  Terrorism Coverage
                  <span>{`$${commifyNumber(submission.excessTerror)}`}</span>
                </div>
            </div>
        )}
            />

            <p>Please check your email for a more detailed pricing indication and review it for accuracy.</p>

            <p>One of our underwriters will be in contact with you to finalize your coverage options and assist you with purchase</p>

            <ul>
              <li>Jessica Buelow – Supervisor – New York - 212-607-8829</li>

              <li>Donna Dolan – Sr. Underwriter – Richmond, VA - 804-560-2099</li>

              <li>Chris Townsend – Underwriter – New York – 212-607-8845</li>

              <li>Santo Pezzotti – Underwriting Trainee – Scottsdale, AZ – 480-889-5647</li>

              <li>Andreanne Frederick – Sr. Underwriting Assistant – New York – 212-607-8806 </li>
            </ul>

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

