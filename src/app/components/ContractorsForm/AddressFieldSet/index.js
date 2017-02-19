import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureOptionSelect from 'components/shared/PureOptionSelect';
import PureRadioSet from 'components/shared/PureRadioSet';

import ToggleDisplay from 'components/shared/ToggleDisplay';

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

      <span
        className="area-label"
        data-tip="Please provide as descriptive of a street address as possible.">
        What is the address of this project?
      </span>

      <PureInput
        type="text"
        field={street}
        validation_status="default"
        validation_message=''
        placeholder="Street"
      />

      <PureInput
        type="text"
        field={city}
        placeholder="City"
        validation_status="default"
        validation_message=''
      />

      <PureOptionSelect
        field={state}
        validation_status="default"
        validation_message=''
      >
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
        validation_status="default"
        validation_message=''
      />

      <ToggleDisplay
        show={state.value === 'NY'}
        render={() => (
          <div>
            <span className="area-label">Is this a NYCHA Project?</span>
            <PureRadioSet
              field={nycha}
              options={[{value:"yes", text:"Yes"},{value:"no", text:"No"}]}
              validation_status='default'
              validation_message=''
              />
          </div>
        )}
      />
  </fieldset>);
}

export default AddressFieldSet;
