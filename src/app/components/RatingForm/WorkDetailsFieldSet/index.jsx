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
      <span className="area-label-sub">Ok, we're going to need some specifics on that</span>
      <ul>
        <li>
          <label>
           <span className="area-label-sub"> When did work begin?</span>
            <PureInput
              type="date"
              field={startDate}
            />
          </label>
        </li>
        <li>
          <label>
            <span className="area-label-sub">What has been completed?</span>
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
            <span className="area-label-sub">What is the name of the GC responsible for prior work?</span>
            <PureInput
              type="text"
              field={generalContractor}
            />
          </label>
        </li>
      </ul>
    </fieldset>
  );
}

export default WorkDetailsFieldSet;
