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
    <fieldset className="sub-questions">
      <span className="area-label-sub">Yes? Ok we'll need some more info.</span>
      <ul>
        <li>
          <span className="area-label-sub">Is coverage for occupancy desired?</span>
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
              <span className="area-label-sub">What type of occupancy?</span>
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
                <span className="area-label-sub">How many units?</span>
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
                <span className="area-label-sub">What is the total square footage or number of occupied units?</span>
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
              <span className="area-label-sub">Any losses in the last 5 years?</span>
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
              <span className="area-label-sub">Will tenants and workers use different stairwells?</span>
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
              <span className="area-label-sub">Will there be separate entry?</span>
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
              <span className="area-label-sub">Security Personnel?</span>
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
              <span className="area-label-sub">Is there a doorman?</span>
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
              <span className="area-label-sub">Are security cameras installed?</span>
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
             <span className="area-label-sub">Is building access limited via keys or card access?</span>
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
      </ul>
    </fieldset>
  );
}

export default OccupancyDetailsFieldSet;
