import React from 'react';

import PureInput from 'components/shared/PureInput';
import {
  validationStatus,
  validationMessage
} from 'app/utils/reduxForm';

function ContactInfoFieldSet(props) {
  const {
    contactInfo: {
      email,
      phone
    },
    errors
  } = props;
  return (
    <fieldset>
      <span className="area-label">Please provide your contact info to receive your indication:</span>

      <PureInput
        type="email"
        field={email}
        placeholder="Email"
        validation_status={ validationStatus(errors, "email") }
        validation_message={ validationMessage(errors, "email") }
      />

      <PureInput
        type="tel"
        field={phone}
        placeholder="Phone"
        validation_status={ validationStatus(errors, "phone") }
        validation_message={ validationMessage(errors, "phone") }
      />

    </fieldset>
  );
}

export default ContactInfoFieldSet;
