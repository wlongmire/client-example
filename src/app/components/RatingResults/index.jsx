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
            <p>Your premium will be: <strong>{`$${commifyNumber(premium)}`}</strong></p>
          </div>
        )}
      />
      <ToggleDisplay
        show={!isDefined(premium) || premium === null}
        render={() => (
          <div>
            <h1>An underwriter is reviewing your details.</h1>
            <p>We couldn't provide you with an instant quote, but one of underwriters will send an e-mail to <strong>{email}</strong> soon with more information.</p>
          </div>
        )}
      />
    </div>
  );
}

export default RatingResults;
