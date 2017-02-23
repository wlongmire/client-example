import React from 'react';

import PureRadioSet from 'components/shared/PureRadioSet';
import ToggleDisplay from 'components/shared/ToggleDisplay';

import DemoDetailsFieldSet from './DemoDetailsFieldSet';

function DemoFieldSet(props) {
  const {
    demoDetails,
    errors
  } = props;

  const options = [{value:"yes", text:"Yes"}, {value:"no", text:"No"}];

  return (
    <fieldset>

      <PureRadioSet
        label={{text:"Will there be demo of exterior walls or roof?",type:"title"}}
        field={demoDetails.willHave}
        options={options}
        validation_status='default'
        validation_message=''
        />

      <ToggleDisplay
        show={demoDetails.willHave.value === 'yes'}
        render={() => (
          <DemoDetailsFieldSet demoDetails={demoDetails} />
        )}
      />

    </fieldset>
  );
}

export default DemoFieldSet;
