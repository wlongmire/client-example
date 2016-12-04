import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureOptionSelect from 'components/shared/PureOptionSelect';

import {commifyNumber} from '../../../utils/utilities';

const limitsArray = [
  5000000,
  10000000
]

function ExcessDetailsFieldSet(props) {
  const {
    excessDetails: {
      required,
      limits
    }
  } = props;
  return (
    <fieldset className="sub-questions">
    <ul>
      <li>
      <span className="area-label-sub">What excess limits are required?</span>
            <PureOptionSelect
              field={limits}
            >
              <option value='0' disabled>Limit</option>
              {
                limitsArray.map((limit) => (
                  <option key={limit} value={limit}>$ {commifyNumber(limit)}</option>
                ))
              }
            </PureOptionSelect>
        </li>
    </ul>
    </fieldset>
)};

export default ExcessDetailsFieldSet;