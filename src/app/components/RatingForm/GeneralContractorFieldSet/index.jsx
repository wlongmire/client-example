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
    <fieldset className="sub-questions">
      <span className="area-label-sub">Yes? Great! Let's get some more information</span>
      <ul>
        <li>
          <label>
            <PureInput
              type="text"
              field={name}
              placeholder="Name of General Contractor"
            />
          </label>
        </li>
        <li>
          <label>
            <PureInput
              type="text"
              field={glCarrier}
              placeholder="General Liability Carrier"
            />
          </label>
        </li>
        <li>
          <label>
            <PureInput
              type="text"
              field={glLimits}
              placeholder="Total GL Limits Required"
            />
          </label>
        </li>
        <li>
           <span className="area-label-sub">Is the owner paying, contracting, or supervising any subcontractors other than the GC?</span>
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
      </ul>
    </fieldset>
  );
}

export default GeneralContractorFieldSet;