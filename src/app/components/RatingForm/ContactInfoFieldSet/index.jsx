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
      Last but not least, let's get some contact info:
      <ol>
        <li>
          <label>
            email:*
            <PureInput
              type="email"
              field={email}
            />
          </label>
        </li>
        <li>
          <label>
            phone:*
            <PureInput
              type="tel"
              field={phone}
            />
          </label>
        </li>
      </ol>
    </fieldset>
  );
}

export default ContactInfoFieldSet;
