import React from 'react';

import PureInput from 'components/shared/PureInput';
import AddressFieldSet from './AddressFieldSet';

function NamedInsuredCredentialsFieldSet(props) {
  const {
    primaryNamedInsured,
    namedInsuredAddress,
    errors
  } = props;

  return (
    <fieldset>
      <ul>

        <li>
          <label>
            <span
              className="area-label"
              data-tip="This entity must be named as the Owner in the contract receiving hold harmless, indemnification and additional insured status from the hired General Contractor">
              Who is the First Named Insured?
            </span>

            <PureInput
              type="text"
              field={primaryNamedInsured}
              placeholder="Input Value"
              validation_status="default"
              validation_message=''
            />
          </label>
        </li>

        <li>
          <AddressFieldSet address={namedInsuredAddress} type='named' />
        </li>

      </ul>
    </fieldset>);
}

export default NamedInsuredCredentialsFieldSet;
