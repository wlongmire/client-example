import React from 'react';
import PureInput from 'components/shared/PureInput';

function ProjectValueFieldSet(props) {
  const {
    costs,
    errors
  } = props;

  return (
    <fieldset>
      <span className="area-label" data-tip="Total Costs means the total cost of all work let or sublet including: a) the cost of all labor, materials and equipment furnished, used or delivered for use in the execution of the work and b) all fees bonuses or commissions made, paid or due.">What is the total construction value of this project?</span>
      <small>(ie. tools, equipment, materials)</small>

      <PureInput
        type="text"
        field={costs}
        validation_status='default'
        validation_message=''
      />

    </fieldset>
  );
}

export default ProjectValueFieldSet;
