import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureOptionSelect from 'components/shared/PureOptionSelect';

const states = ['AK','AL','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

function AddressFieldSet(props) {
  let title;
  if (props.type === 'project') {
    title = 'What is the address of this project?'
  } else if (props.type === 'named') {
    title = 'What is the address of the named insured?'
  }
  const {
    address: {
      street,
      city,
      state,
      zip
    }
  } = props;
  return (
    <fieldset>
      {title}
      <ol>
        <li>
          <label>
            Street Address*
            <PureInput
              type="text"
              field={street}
            />
          </label>
        </li>
        <li>
          <label>
            City*
            <PureInput
              type="text"
              field={city}
            />
          </label>
        </li>
        <li>
          <label>
            State*
            <PureOptionSelect
              field={state}
            >
              <option value="" disabled>Select a state</option>
              {
                states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))
              }
            </PureOptionSelect>
          </label>
        </li>
        <li>
          <label>
            Zip*
            <PureInput
              type="text"
              field={zip}
            />
          </label>
        </li>
      </ol>
    </fieldset>
  );
}

export default AddressFieldSet;
