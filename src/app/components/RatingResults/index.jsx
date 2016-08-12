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
            <h1>Congratulations! You qualify for coverage.</h1>
            <p>Your yearly premium will be: <strong>{`$${commifyNumber(premium)}`}</strong></p>
            <p>One of our underwriters will be in contact with you to finalize your coverage options and assist you with purchase</p>
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
