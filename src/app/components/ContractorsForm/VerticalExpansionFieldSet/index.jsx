import React from 'react';

import PureRadioSet from 'components/shared/PureInput';

function VerticalExpansionFieldSet(props) {
  const {
    overFourFloors,
    errors
  } = props;

  return (
    <fieldset>

      <span className="area-label" data-tip="Does the project include the addition of any stories or vertical expansion?">
      Does the project include the addition of any stories or vertical expansion?
      </span>

      <PureRadioSet
        field={overFourFloors}
        options={[{value:"yes", text:"Yes"},{value:"no", text:"No"}]}
        validation_status='default'
        validation_message=''
        />

    </fieldset>);
}

export default VerticalExpansionFieldSet;
