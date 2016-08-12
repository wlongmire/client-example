import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureRadio from 'components/shared/PureRadio';

function GeneralContractorFieldSet(props) {
  const {
    generalContractor: {
      name,
      glCarrier,
      glLimits,
      isSupervisingSubs
    }
  } = props;
  return (
    <fieldset>
      Yes? Yes? Great! Let's get some more information
      <ol>
        <li>
          <label>
            Name of general contractor?
            <PureInput
              type="text"
              field={name}
            />
          </label>
        </li>
        <li>
          <label>
            General Liability carrier:
            <PureInput
              type="text"
              field={glCarrier}
            />
          </label>
        </li>
        <li>
          <label>
            Total GL limits required:
            <PureInput
              type="text"
              field={glLimits}
            />
          </label>
        </li>
        <li>
          Is the GC paying contracting/supervising all subs?
          <radiogroup>
            <label>
              <PureRadio
                value="yes"
                field={isSupervisingSubs}
              />
              Yes
            </label>
            <label>
              <PureRadio
                value="no"
                field={isSupervisingSubs}
              />
              No
            </label>
          </radiogroup>
        </li>
      </ol>
    </fieldset>
  );
}

export default GeneralContractorFieldSet;
