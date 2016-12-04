import React from 'react';

import PureInput from 'components/shared/PureInput';

function ContactInfoFieldSet(props) {
  const {
    contactInfo: {
      email,
      phone
    }
  } = props;
  return (
    <fieldset>
      <span className="area-label">Please provide your contact info to receive your indication:</span>
      <ul className="no-bullets">
        <li>
          <label>
            <PureInput
              type="email"
              field={email}
              placeholder="Email"
            />
          </label>
        </li>
        <li>

          <label>
            <PureInput
              type="tel"
              field={phone}
              placeholder="Phone"
            />
          </label>
        </li>
      </ul>
    </fieldset>
  );
}

export default ContactInfoFieldSet;