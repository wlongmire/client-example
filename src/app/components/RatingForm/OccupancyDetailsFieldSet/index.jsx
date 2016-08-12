import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureRadio from 'components/shared/PureRadio';
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
    <fieldset>
      Yes? Ok we'll need some more info
      <ol>
        <li>
          Is coverage for occupancy desired?
          <radiogroup>
            <label>
              <PureRadio
                value="yes"
                field={isCoverageDesired}
              />
              Yes
            </label>
            <label>
              <PureRadio
                value="no"
                field={isCoverageDesired}
              />
              No
            </label>
          </radiogroup>
        </li>
        <ToggleDisplay
          show={isCoverageDesired.value === 'yes'}
          render={() => (
            <li>
              What type of occupancy?
              <radiogroup>
                <label>
                  <PureRadio
                    value="residential"
                    field={type}
                  />
                  Residential
                </label>
                <label>
                  <PureRadio
                    value="commercial"
                    field={type}
                  />
                  Commercial
                </label>
              </radiogroup>
            </li>
          )}
        />
        <ToggleDisplay
          show={isCoverageDesired.value === 'yes' && type.value === 'residential'}
          render={() => (
            <li>
              <label>
                How many units?
                <PureInput
                  type="number"
                  field={numberOfUnits}
                />
              </label>
            </li>
          )}
        />
        <ToggleDisplay
          show={isCoverageDesired.value === 'yes'}
          render={() => (
            <li>
              <label>
                What is the total square footage?
                <PureInput
                  type="number"
                  field={squareFootage}
                />
              </label>
            </li>
          )}
        />
        <ToggleDisplay
          show={isCoverageDesired.value === 'yes'}
          render={() => (
            <li>
              Any losses in the last 5 years?
              <radiogroup>
                <label>
                  <PureRadio
                    value="yes"
                    field={lossesInLastFiveYears}
                  />
                  Yes
                </label>
                <label>
                  <PureRadio
                    value="no"
                    field={lossesInLastFiveYears}
                  />
                  No
                </label>
              </radiogroup>
            </li>
          )}
        />
        <ToggleDisplay
          show={isCoverageDesired.value === 'yes'}
          render={() => (
            <li>
              Will tenants and workers use different stairwells?
              <radiogroup>
                <label>
                  <PureRadio
                    value="yes"
                    field={separateStairwells}
                  />
                  Yes
                </label>
                <label>
                  <PureRadio
                    value="no"
                    field={separateStairwells}
                  />
                  No
                </label>
              </radiogroup>
            </li>
          )}
        />
        <ToggleDisplay
          show={isCoverageDesired.value === 'yes'}
          render={() => (
            <li>
              Will there be separate entry?
              <radiogroup>
                <label>
                  <PureRadio
                    value="yes"
                    field={separateEntry}
                  />
                  Yes
                </label>
                <label>
                  <PureRadio
                    value="no"
                    field={separateEntry}
                  />
                  No
                </label>
              </radiogroup>
            </li>
          )}
        />
        <ToggleDisplay
          show={isCoverageDesired.value === 'yes'}
          render={() => (
            <li>
              Security Personnel?
              <radiogroup>
                <label>
                  <PureRadio
                    value="yes"
                    field={securityPersonnel}
                  />
                  Yes
                </label>
                <label>
                  <PureRadio
                    value="no"
                    field={securityPersonnel}
                  />
                  No
                </label>
              </radiogroup>
            </li>
          )}
        />
        <ToggleDisplay
          show={isCoverageDesired.value === 'yes'}
          render={() => (
            <li>
              Is there a doorman?
              <radiogroup>
                <label>
                  <PureRadio
                    value="yes"
                    field={doorman}
                  />
                  Yes
                </label>
                <label>
                  <PureRadio
                    value="no"
                    field={doorman}
                  />
                  No
                </label>
              </radiogroup>
            </li>
          )}
        />
        <ToggleDisplay
          show={isCoverageDesired.value === 'yes'}
          render={() => (
            <li>
              Are security cameras installed?
              <radiogroup>
                <label>
                  <PureRadio
                    value="yes"
                    field={securityCameras}
                  />
                  Yes
                </label>
                <label>
                  <PureRadio
                    value="no"
                    field={securityCameras}
                  />
                  No
                </label>
              </radiogroup>
            </li>
          )}
        />
        <ToggleDisplay
          show={isCoverageDesired.value === 'yes'}
          render={() => (
            <li>
              Is building access limited via keys or card access?
              <radiogroup>
                <label>
                  <PureRadio
                    value="yes"
                    field={buildingAccessLimited}
                  />
                  Yes
                </label>
                <label>
                  <PureRadio
                    value="no"
                    field={buildingAccessLimited}
                  />
                  No
                </label>
              </radiogroup>
            </li>
          )}
        />
      </ol>
    </fieldset>
  );
}

export default OccupancyDetailsFieldSet;
