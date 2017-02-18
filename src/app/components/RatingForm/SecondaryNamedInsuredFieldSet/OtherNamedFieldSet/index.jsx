import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureRadio from 'components/shared/PureRadio';
import PureOptionSelect from 'components/shared/PureOptionSelect';

const states = ['AK','AL','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];


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

  return (
    <fieldset className="sub-questions">
      <span className="area-label-sub">We need their info as well.</span>

        <ul>
          <li>
            <label>
              <PureInput
                type="text"
                field={name}
                placeholder="Name"
                validation_status="default"
                validation_message=''
              />
            </label>
          </li>

          <li>
            <label>
              <PureInput
                type="text"
                field={relationship}
                placeholder="Relationship to Primary"
                validation_status="default"
                validation_message=''
              />
            </label>
          </li>

          <li>
            <label>
              <PureInput
                type="text"
                field={street}
                placeholder="Street"
                validation_status="default"
                validation_message=''
              />
            </label>
          </li>

          <li>
            <label>
              <PureInput
                type="text"
                field={city}
                placeholder="City"
                validation_status="default"
                validation_message=''
              />
            </label>
          </li>

          <li>
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
          </li>

          <li>
            <PureInput
              type="text"
              field={zip}
              placeholder="Zip"
              className="zip-input"
              validation_status="default"
              validation_message=''
            />
          </li>


        </ul>

    </fieldset>
  );
}

export default OtherNamedFieldSet;
