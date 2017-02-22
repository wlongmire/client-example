import React from 'react';

import PureRadioSet from 'components/shared/PureRadioSet';
import ToggleDisplay from 'components/shared/ToggleDisplay';

import WorkDetailsFieldSet from './WorkDetailsFieldSet';

function HasWorkStartedFieldSet(props) {
  const {
    workDetails,
    errors
  } = props;

  const options = [{value:"yes", text:"Yes"}, {value:"no", text:"No"}];

  return (
    <fieldset>

      <PureRadioSet
        label={{text:"Has Work started on this project?",type:"title"}}
        field={workDetails.hasStarted}
        options={options}
        validation_status='default'
        validation_message=''
        />

      <ToggleDisplay
        show={workDetails.hasStarted.value === 'yes'}
        render={() => (
          <WorkDetailsFieldSet workDetails={workDetails} />
        )}
      />

    </fieldset>
  );
}

export default HasWorkStartedFieldSet;
