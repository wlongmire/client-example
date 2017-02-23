import React from 'react';

import PureTextArea from 'components/shared/PureInput';

function GeneralCommentsFieldSet(props) {
  const {
    generalComments,
    errors
  } = props;

  return (
    <fieldset>
      <span className="area-label">General Comments</span>

      <PureTextArea
        field={generalComments}
        validation_status='default'
        validation_message=''
      />

    </fieldset>
  );
}

export default GeneralCommentsFieldSet;
