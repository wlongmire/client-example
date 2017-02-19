import React from 'react';

import PureRadioSet from 'components/shared/PureRadioSet';
import ToggleDisplay from 'components/shared/ToggleDisplay';

function ProjectRequirementsFieldSet(props) {
  const {
    projectRequirements,
    errors
  } = props;

  return (
    <fieldset>
      <span
        className="area-label">
        Does the project require any of the following:
      </span>

      <small>
        Blasting, Airport Runways, Bridge Construction, Parking Garages/Decks, Dams, Underground Tunneling for Subways or Mines
      </small>

      <PureRadioSet
        field={projectRequirements}
        options={[{value:"yes", text:"Yes"},{value:"no", text:"No"}]}
        validation_status='default'
        validation_message=''
      />

    </fieldset>);
}

export default ProjectRequirementsFieldSet;
