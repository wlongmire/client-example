import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureOptionSelect from 'components/shared/PureOptionSelect';
import ToggleDisplay from 'components/shared/ToggleDisplay';
import PureRadio from 'components/shared/PureRadio';

function AddressFieldSet(props) {
  const {
    nycha,
    address: {
      street,
      city,
      state,
      zip
    }
  } = props;

  const states = ['AK','AL','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

  return (
    <fieldset>
      <span data-tip="Please provide as descriptive of a street address as possible.">What is the address of this project?</span>

      <PureInput
        type="text"
        field={street}
        placeholder="Street"
      />

      <PureInput
        type="text"
        field={city}
        placeholder="City"
      />

      <PureOptionSelect field={state}>
      <option value="" disabled>State</option>
      {
        states.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))
      }
      </PureOptionSelect>

      <PureInput
        type="text"
        field={zip}
        placeholder="Zip"
        className="zip-input"
      />

    </fieldset>
  );
}

export default AddressFieldSet;