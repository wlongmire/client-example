import React from 'react';

import PureInput from 'components/shared/PureInput';
import AddressFieldSet from './AddressFieldSet';

import {
  validationStatus,
  validationMessage
} from 'app/utils/reduxForm';

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
              validation_status={ validationStatus(errors, "name") }
              validation_message={ validationMessage(errors, "name") }
            />
          </label>
        </li>

        <li>
          <AddressFieldSet
            address={namedInsuredAddress}
            errors={errors}
            type='named' />
        </li>

      </ul>
    </fieldset>);
}

export default NamedInsuredCredentialsFieldSet;
