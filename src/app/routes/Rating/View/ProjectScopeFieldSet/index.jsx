import React from 'react';
import PureTextArea from 'components/shared/PureTextArea';

function ProjectScopeFieldSet(props) {
  const {
    scope,
    errors
  } = props;

  return (
    <fieldset>
      <span
        className="area-label"
        data-tip="Please be as descriptives possible">
        Please describe the scope of work for this project (as much detail as possible - include end use)
      </span>

      <PureTextArea
        field={scope}
        validation_status='default'
        validation_message=''
        />

    </fieldset>
  );
}

export default ProjectScopeFieldSet;
