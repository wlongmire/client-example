import React from 'react';

import PureRadioSet from 'components/shared/PureRadioSet';
import ToggleDisplay from 'components/shared/ToggleDisplay';

import OccupancyDetailsFieldSet from './OccupancyDetailsFieldSet';

function OccupancyFieldSet(props) {
  const {
    occupancyDetails,
    errors
  } = props;

  const options = [{value:"yes", text:"Yes"}, {value:"no", text:"No"}];

  return (
    <fieldset>

      <PureRadioSet
        label={{text:"Will there be occupancy during the project?",type:"title"}}
        field={occupancyDetails.willHave}
        options={options}
        validation_status='default'
        validation_message=''
        />

      <ToggleDisplay
        show={occupancyDetails.willHave.value === 'yes'}
        render={() => (
          <OccupancyDetailsFieldSet occupancyDetails={occupancyDetails} />
        )}
      />

    </fieldset>
  );
}

export default OccupancyFieldSet;
