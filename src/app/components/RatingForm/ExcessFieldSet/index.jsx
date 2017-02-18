import React from 'react';

import PureRadioSet from 'components/shared/PureRadioSet';
import ToggleDisplay from 'components/shared/ToggleDisplay';

import ExcessDetailsFieldSet from './ExcessDetailsFieldSet';

function ExcessFieldSet(props) {
  const {
    excessDetails,
    errors
  } = props;

  const options = [{value:"yes", text:"Yes"}, {value:"no", text:"No"}];

  return (
    <fieldset>

      <PureRadioSet
        label={{text:"Does this project require excess coverage?",type:"title"}}
        field={excessDetails.required}
        options={options}
        validation_status='default'
        validation_message=''
        />

      <ToggleDisplay
        show={excessDetails.required.value === 'yes'}
        render={() => (
          <ExcessDetailsFieldSet excessDetails={excessDetails} />
        )}
      />

    </fieldset>
  );
}

export default ExcessFieldSet;
