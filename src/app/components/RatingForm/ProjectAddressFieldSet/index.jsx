import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureOptionSelect from 'components/shared/PureOptionSelect';
import ToggleDisplay from 'components/shared/ToggleDisplay';

import {
  validationStatus,
  validationMessage
} from 'app/utils/reduxForm';

function ProjectAddressFieldSet(props) {
  const {
    nycha,
    address: {
      street,
      city,
      state,
      zip
    },
    errors
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
        placeholder='Address'
        validation_status={ validationStatus(errors, "street") }
        validation_message={ validationMessage(errors, "street") }
      />

      <PureInput
        type="text"
        field={city}
        placeholder="City"
        validation_status={ validationStatus(errors, "city") }
        validation_message={ validationMessage(errors, "city") }
      />

      <PureOptionSelect
        field={state}
        validation_status={ validationStatus(errors, "state") }
        validation_message={ validationMessage(errors, "state") }
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
        placeholder='Zipcode'
        className="zip-input"
        validation_status={ validationStatus(errors, "zip") }
        validation_message={ validationMessage(errors, "zip") }
      />
    </fieldset>
  );
}

export default ProjectAddressFieldSet;
