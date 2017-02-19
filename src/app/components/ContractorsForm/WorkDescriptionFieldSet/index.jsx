import React from 'react';

import PureTextArea from 'components/shared/PureTextArea';

function WorkDescriptionFieldSet(props) {
  const {
    scope,
    errors
  } = props;

  return (
    <fieldset>

      <span
        className="area-label double"
        data-tip="Please provide as descriptive of a scope of work as possible including end use.">
        What is the scope of work for this project?
      </span>

      <PureTextArea
        field={scope}
      />

    </fieldset>);
}

export default WorkDescriptionFieldSet;
