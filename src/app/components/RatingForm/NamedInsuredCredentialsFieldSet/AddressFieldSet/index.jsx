import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureOptionSelect from 'components/shared/PureOptionSelect';
import ToggleDisplay from 'components/shared/ToggleDisplay';
import PureRadio from 'components/shared/PureRadio';

const states = ['AK','AL','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

function AddressFieldSet(props) {
  //let title;
  let titleTag;
  if (props.type === 'project') {
    titleTag = '<span data-tip="Please provide as descriptive of a street address as possible.">What is the address of this project?</span>';
  } else if (props.type === 'named') {
    titleTag = '<span data-tip="Please provide as descriptive of a street address as possible.">What is the address of the Named Insured?</span>';
  } else if (props.type === 'other') {
    titleTag = '<span></span>';
  }

  const {
    nycha,
    address: {
      street,
      city,
      state,
      zip
    }
  } = props;

  function createMarkup() {
    return {__html: titleTag};
  }

  return (
    <fieldset>

      <span className="area-label" dangerouslySetInnerHTML={createMarkup()} />
      
      <ul className="no-padding">

        <li>
          <label>
            <PureInput
              type="text"
              field={street}
              placeholder="Street"
            />
          </label>
        </li>

        <li>
          <label>
            <PureInput
              type="text"
              field={city}
              placeholder="City"
            />
          </label>
        </li>

        <li>
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
        </li>

      </ul>
    </fieldset>
  );
}

export default AddressFieldSet;
