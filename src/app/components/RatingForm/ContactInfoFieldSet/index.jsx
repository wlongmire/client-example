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

      <PureInput
        type="email"
        field={email}
        placeholder="Email"
        validation_status='default'
        validation_message=''
      />

      <PureInput
        type="tel"
        field={phone}
        placeholder="Phone"
        validation_status='default'
        validation_message=''
      />

    </fieldset>
  );
}

export default ContactInfoFieldSet;
