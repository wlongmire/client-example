import React from 'react';

import PureRadioSet from 'components/shared/PureRadioSet';
import PureTextArea from 'components/shared/PureTextArea';
import ToggleDisplay from 'components/shared/ToggleDisplay';

import {
  validationStatus,
  validationMessage
} from 'app/utils/reduxForm';

function SpecificFloorsFieldSet(props) {
  const {
    projectDefinedAreaScope,
    projectDefinedAreaScopeDetails,
    errors
  } = props;

  return (
    <fieldset>

      <span
        className="area-label"
        data-tip="Is project limited to specific floors?">
        Is project limited to specific floors?
      </span>

      <PureRadioSet
        field={projectDefinedAreaScope}
        options={[{value:"yes", text:"Yes"},{value:"no", text:"No"}]}
        validation_status={ validationStatus(errors, "required") }
        validation_message={ validationMessage(errors, "required") }
        />

        <ToggleDisplay
          show={projectDefinedAreaScope.value === 'yes'}
          render={() => (
            <fieldset className="sub-questions">
            <span className="area-label-sub">Give details.</span>

            <PureTextArea
            field={projectDefinedAreaScopeDetails}
            />

            </fieldset>
          )}
        />
    </fieldset>);
}

export default SpecificFloorsFieldSet;
