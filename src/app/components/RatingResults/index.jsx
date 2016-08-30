import React from 'react';

import styles from './styles';

import ToggleDisplay from 'components/shared/ToggleDisplay';

import { commifyNumber, isDefined } from 'app/utils/utilities';

function RatingResults(props) {
  const {
    location: {
      state: {
        premium,
        email
      }
    }
  } = props;
  return (
    <div className="RatingResults__container">
      <ToggleDisplay
        show={isDefined(premium) && premium !== null}
        render={() => (
          <div>
          <div>
            <h1>Congratulations! This project qualifies for an instant price.</h1>
            <p>The yearly base premium will be: <strong>{`$${commifyNumber(premium)}`}</strong></p>

            <p>Please check your email for a more detailed pricing indication and review it for accuracy.</p>

            <p>One of our underwriters will be in contact with you to finalize your coverage options and assist you with purchase</p>

          </div>
          <div class='legalText'>
            <p>The "pricing indication" is issued as a matter of information only  and does not  confer any  rights upon the insured or constitute a contract between  Colony Specialty and the authorized representative or producer of the insured or the insured.</p>
          </div>
          </div>
        )}
      />
      <ToggleDisplay
        show={!isDefined(premium) || premium === null}
        render={() => (
          <div>
            <h1>An underwriter is reviewing your details.</h1>
            <p>Based on your answers, we couldn't provide you with an instant quote. One of our underwriters will send an e-mail to <strong>{email}</strong> soon with more information.</p>
          </div>
        )}
      />
    </div>
  );
}

export default RatingResults;
