import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureRadioSet from 'components/shared/PureRadioSet';
import ToggleDisplay from 'components/shared/ToggleDisplay';

function OccupancyDetailsFieldSet(props) {
  const {
    occupancyDetails: {
      isCoverageDesired,
      type,
      numberOfUnits,
      squareFootage,
      lossesInLastFiveYears,
      separateStairwells,
      separateEntry,
      securityPersonnel,
      doorman,
      securityCameras,
      buildingAccessLimited
    }
  } = props;

  return (
    <fieldset className="sub-questions">
      <span className="area-label-sub">Yes? Ok we&#39;ll need some more info.</span>

      <ul>
        <li>
          <PureRadioSet
            label={{text:"Is coverage for occupancy desired?",type:"subtitle"}}
            field={isCoverageDesired}
            options={[{value:"yes", text:"Yes"}, {value:"no", text:"No"}]}
            validation_status='default'
            validation_message=''
            />
        </li>

        <ToggleDisplay
          show={isCoverageDesired.value === 'yes'}
          render={() => (
            <li>
              <PureRadioSet
                label={{text:"What type of occupancy?",type:"subtitle"}}
                field={type}
                options={[{value:"residential", text:"Residential"}, {value:"commercial", text:"Commercial"}]}
                validation_status='default'
                validation_message=''
                />
            </li>
          )}
        />

        <ToggleDisplay
          show={isCoverageDesired.value === 'yes' && type.value === 'residential'}
          render={() => (
            <li>
              <PureInput
                label={{text:"How many units?",type:"subtitle"}}
                type="number"
                field={numberOfUnits}
                validation_status='default'
                validation_message=''
              />
            </li>
          )}
        />
        <ToggleDisplay
          show={isCoverageDesired.value === 'yes'}
          render={() => (
            <li>
              <PureInput
                label={{text:"What is the total square footage or number of occupied units?",type:"subtitle"}}
                type="number"
                field={squareFootage}
                validation_status='default'
                validation_message=''
              />
            </li>
          )}
        />
        <ToggleDisplay
          show={isCoverageDesired.value === 'yes'}
          render={() => (
            <li>
              <PureRadioSet
                label={{text:"Any losses in the last 5 years?",type:"subtitle"}}
                field={lossesInLastFiveYears}
                options={[{value:"yes", text:"Yes"}, {value:"no", text:"No"}]}
                validation_status='default'
                validation_message=''
                />
            </li>
          )}
        />
        <ToggleDisplay
          show={isCoverageDesired.value === 'yes'}
          render={() => (
            <li>
              <PureRadioSet
                label={{text:"Will tenants and workers use different stairwells?",type:"subtitle"}}
                field={separateStairwells}
                options={[{value:"yes", text:"Yes"}, {value:"no", text:"No"}]}
                validation_status='default'
                validation_message=''
                />
            </li>
          )}
        />
        <ToggleDisplay
          show={isCoverageDesired.value === 'yes'}
          render={() => (
            <li>
              <PureRadioSet
                label={{text:"Will there be separate entry?",type:"subtitle"}}
                field={separateEntry}
                options={[{value:"yes", text:"Yes"}, {value:"no", text:"No"}]}
                validation_status='default'
                validation_message=''
                />
            </li>
          )}
        />

        <ToggleDisplay
          show={isCoverageDesired.value === 'yes'}
          render={() => (
            <li>
              <PureRadioSet
                label={{text:"Security Personnel?",type:"subtitle"}}
                field={securityPersonnel}
                options={[{value:"yes", text:"Yes"}, {value:"no", text:"No"}]}
                validation_status='default'
                validation_message=''
                />
            </li>
          )}
        />

        <ToggleDisplay
          show={isCoverageDesired.value === 'yes'}
          render={() => (
            <li>
              <PureRadioSet
                label={{text:"Is there a doorman?",type:"subtitle"}}
                field={doorman}
                options={[{value:"yes", text:"Yes"}, {value:"no", text:"No"}]}
                validation_status='default'
                validation_message=''
                />
            </li>
          )}
        />

        <ToggleDisplay
          show={isCoverageDesired.value === 'yes'}
          render={() => (
            <li>
              <PureRadioSet
                label={{text:"Are security cameras installed?",type:"subtitle"}}
                field={securityCameras}
                options={[{value:"yes", text:"Yes"}, {value:"no", text:"No"}]}
                validation_status='default'
                validation_message=''
                />
            </li>
          )}
        />
        <ToggleDisplay
          show={isCoverageDesired.value === 'yes'}
          render={() => (
            <li>
              <PureRadioSet
                label={{text:"Is building access limited via keys or card access?",type:"subtitle"}}
                field={buildingAccessLimited}
                options={[{value:"yes", text:"Yes"}, {value:"no", text:"No"}]}
                validation_status='default'
                validation_message=''
                />
            </li>
          )}
        />
      </ul>
    </fieldset>
  );
}

export default OccupancyDetailsFieldSet;
