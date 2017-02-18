import React from 'react';

import PureOptionSelect from 'components/shared/PureOptionSelect';
import {commifyNumber} from '../../../../utils/utilities';

function ExcessDetailsFieldSet(props) {
  const {
    excessDetails: {
      required,
      limits
    }
  } = props;

  const limitsArray = [ 5000000, 10000000 ];

  return (
    <fieldset className="sub-questions">

      <span className="area-label-sub">What excess limits are required?</span>
        <PureOptionSelect
          field={limits}
          validation_status='default'
          validation_message=''>
          
          <option value='0' disabled>Limit</option>
          {
            limitsArray.map((limit) => (
              <option key={limit} value={limit}>$ {commifyNumber(limit)}</option>
            ))
          }

        </PureOptionSelect>

    </fieldset>
)};

export default ExcessDetailsFieldSet;
