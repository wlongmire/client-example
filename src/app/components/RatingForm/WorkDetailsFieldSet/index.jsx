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
    <fieldset>
      Ok, we're going to need some specifics on that
      <ol>
        <li>
          <label>
            When did work begin?
            <PureInput
              type="date"
              field={startDate}
            />
          </label>
        </li>
        <li>
          <label>
            What has been completed?
            <PureTextArea
              field={whatsCompleted}
            />
          </label>
        </li>
        <li>
          <label>
            Total const spent to date?
            <PureInput
              type="number"
              field={totalSpend}
            />
          </label>
        </li>
        <li>
          <label>
            What is the name of the GC responsible for prior work?
            <PureInput
              type="text"
              field={generalContractor}
            />
          </label>
        </li>
      </ol>
    </fieldset>
  );
}

export default WorkDetailsFieldSet;
