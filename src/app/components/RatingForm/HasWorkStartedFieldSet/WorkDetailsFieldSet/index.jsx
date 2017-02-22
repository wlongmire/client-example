import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureTextArea from 'components/shared/PureTextArea';

function WorkDetailsFieldSet(props) {
  const {
    workDetails: {
      startDate,
      whatsCompleted,
      totalSpend,
      generalContractor
    }
  } = props;

  return (
    <fieldset className="sub-questions">
      <span className="area-label-sub">Ok, we're going to need some specifics on that</span>

      <span className="area-label-sub"> When did work begin?</span>
      <PureInput
        type="date"
        field={startDate}
        validation_status='default'
        validation_message=''
      />

      <span className="area-label-sub">What has been completed?</span>
      <PureTextArea
        field={whatsCompleted}
        validation_status='default'
        validation_message=''
      />

      <span className="area-label-sub">Total const spent to date?</span>

      <PureInput
        type="number"
        field={totalSpend}
        validation_status='default'
        validation_message=''
      />

      <span className="area-label-sub">What is the name of the GC responsible for prior work?</span>
      <PureInput
        type="text"
        field={generalContractor}
        validation_status='default'
        validation_message=''
      />

    </fieldset>
  );
}

export default WorkDetailsFieldSet;
