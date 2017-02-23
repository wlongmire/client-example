import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureRadioSet from 'components/shared/PureRadioSet';
import PureOptionSelect from 'components/shared/PureOptionSelect';

import {
  validationStatus,
  validationMessage
} from 'app/utils/reduxForm';

function OtherNamedFieldSet(props) {
  const {
    otherNamedInsured: {
      name,
      relationship,
      street,
      city,
      state,
      zip,
      greaterThanTwoNamed
    },
    errors
  } = props;

  const states = ['AK','AL','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
  const options = [
    {value:'yes', text:'Yes'},
    {value:'no',  text:'No'}
  ];

  return (
    <fieldset className="sub-questions">
      <PureInput
        type="text"
        field={name}
        placeholder="Name"
        validation_status={ validationStatus(errors, "name") }
        validation_message={ validationMessage(errors, "name") }
      />

      <PureInput
        type="text"
        field={relationship}
        placeholder="Relationship to Primary"
        validation_status={ validationStatus(errors, "relationship") }
        validation_message={ validationMessage(errors, "relationship") }
      />

      <PureInput
        type="text"
        field={street}
        placeholder="Address"
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
      placeholder="Zipcode"
      className="zip-input"
      validation_status={ validationStatus(errors, "zip") }
      validation_message={ validationMessage(errors, "zip") }
    />

    <PureRadioSet
      label={{text:"Any other named insured?",type:"subtitle"}}
      field={greaterThanTwoNamed}
      options={options}
      validation_status={ validationStatus(errors, "greaterThanTwoNamed") }
      validation_message={ validationMessage(errors, "greaterThanTwoNamed") }
      />
    </fieldset>
  );
}

export default OtherNamedFieldSet;
