import React from 'react';
import { connect } from 'react-redux';

import PureInput from 'components/shared/PureInput';
import AddressFieldSet from './AddressFieldSet';

function NamedInsuredCredentialsFieldSet(props) {
  const {
    primaryNamedInsured,
    namedInsuredAddress
  } = props;

  return (
    <fieldset>
      <ul>

        <li>
          <label>
            <span className="area-label" data-tip="This entity must be named as the Owner in the contract receiving hold harmless, indemnification and additional insured status from the hired General Contractor">Who is the First Named Insured?</span>
            <PureInput
              type="text"
              field={primaryNamedInsured}
              placeholder="Input Value"
            />
          </label>
        </li>

        <li>
          <AddressFieldSet address={namedInsuredAddress} type='named' />
        </li>

      </ul>
    </fieldset>);
}

export default connect((state) => {
  return ({
    errors: (state.error.ratingOI)? state.error.ratingOI.namedInsuredCredentials:{}
  });

})(NamedInsuredCredentialsFieldSet);
