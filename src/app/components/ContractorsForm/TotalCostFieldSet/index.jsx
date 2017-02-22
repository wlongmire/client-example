import React from 'react';
import {
  validationStatus,
  validationMessage
} from 'app/utils/reduxForm';

import PureInput from 'components/shared/PureInput';

function TotalCostField(props) {
  const {
    costs,
    errors
  } = props;

  return (
    <fieldset>

      <span
        className="area-label"
        data-tip="Total Costs means the total cost of all work let or sublet including: a) the cost of all labor, materials and equipment furnished, used or delivered for use in the execution of the work and b) all fees bonuses or commissions made, paid or due.">
        What is the total cost of this project?
      </span>

      <PureInput
        type="text"
        field={costs}
        validation_status={ validationStatus(errors, "cost") }
        validation_message={ validationMessage(errors, "cost") }
      />

    </fieldset>);
}

export default TotalCostField;
