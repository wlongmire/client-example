import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureRadio from 'components/shared/PureRadio';
import PureOptionSelect from 'components/shared/PureOptionSelect';
import PureTextArea from 'components/shared/PureTextArea';
import ToggleDisplay from 'components/shared/ToggleDisplay';

import styles from './styles';

import AdditionalInsuredFieldSet from './AdditionalInsuredFieldSet';
import AddressFieldSet from './AddressFieldSet';
import GeneralContractorFieldSet from './GeneralContractorFieldSet';
import OccupancyDetailsFieldSet from './OccupancyDetailsFieldSet';
import DemoDetailsFieldSet from './DemoDetailsFieldSet';
import WorkDetailsFieldSet from './WorkDetailsFieldSet';
import ContactInfoFieldSet from './ContactInfoFieldSet';
import ExcessDetailsFieldSet from './ExcessDetailsFieldSet';
import OtherNamedFieldSet from './OtherNamedFieldSet';

import decorator from './decorators';

function RatingForm(props) {
  const {
    fields: {
      primaryNamedInsured,
      namedInsuredAddress,
      hasOtherNamedInsured,
      otherNamedInsured,
      greaterThanTwoNamed,
      hasAdditionalInsured,
      greaterThanTwoAdditional,
      additionalInsured,
      address,
      scope,
      term,
      costs,
      towerCraneUse,
      generalContractor,
      occupancyDetails,
      demoDetails,
      workDetails,
      excessDetails,
      contactInfo,
      generalComments
    },
    handleSubmit
  } = props;
  return (
    <form className="RatingForm__container" onSubmit={handleSubmit}>
      <ul className="no-bullets">
        <li>
          <label>
            <span className="area-label">Who is the First Named Insured?</span>
            <PureInput
              type="text"
              field={primaryNamedInsured}
              placeholder="Input Value"
            />
          </label>
        </li>
        <li>
          <AddressFieldSet address={namedInsuredAddress} type='named' />
        </li>
        <li>
          <span className="area-label">Is there a secondary Named Insured?</span>
          <radiogroup>
            <label>
              <PureRadio
                value="yes"
                field={hasOtherNamedInsured}
              />
              Yes
            </label>
            <label>
              <PureRadio
                value="no"
                field={hasOtherNamedInsured}
              />
              No
            </label>
          </radiogroup>
        </li>
        <ToggleDisplay
          show={hasOtherNamedInsured.value === 'yes'}
          render={() => (
            <li>
              <OtherNamedFieldSet otherNamedInsured={otherNamedInsured} greaterThanTwoNamed={greaterThanTwoNamed} />
            </li>
          )}
        />
        <li>
          <span className="area-label">Any additional Insured?</span>
          <radiogroup>
            <label>
              <PureRadio
                value="yes"
                field={hasAdditionalInsured}
              />
              Yes
            </label>
            <label>
              <PureRadio
                value="no"
                field={hasAdditionalInsured}
              />
              No
            </label>
          </radiogroup>
        </li>
        <ToggleDisplay
          show={hasAdditionalInsured.value === 'yes'}
          render={() => (
            <li>
              <AdditionalInsuredFieldSet additionalInsured={additionalInsured} greaterThanTwoAdditional={greaterThanTwoAdditional} />
            </li>
          )}
        />
        <li>
          <AddressFieldSet address={address} type='project' />
        </li>
        <li>
          <label>
           <span className="area-label">Please describe the scope of work for this project (include end use) </span>
            <PureTextArea
              field={scope}
            />
          </label>
        </li>
        <li>
          <label>
          <span className="area-label"> What is the term of the project, in months?*</span>
            <PureInput
              type="number"
              field={term}
            />
          </label>
        </li>
        <li>
          <label>
           <span className="area-label">What is the total construction value of this project? </span>
           <small>(ie. tools, equipment, materials)</small>
            <PureInput
              type="text"
              field={costs}
            />
          </label>
        </li>
        <li>
         <span className="area-label"> Will there be use of a tower crane on this project? </span>
          <radiogroup>
            <label>
              <PureRadio
                value="yes"
                field={towerCraneUse}
              />
              Yes
            </label>
            <label>
              <PureRadio
                value="no"
                field={towerCraneUse}
              />
              No
            </label>
          </radiogroup>
        </li>
        <li>
         <span className="area-label">Is the General Contractor known? </span>
          <radiogroup>
            <label>
              <PureRadio
                value="yes"
                field={generalContractor.isKnown}
              />
              Yes
            </label>
            <label>
              <PureRadio
                value="no"
                field={generalContractor.isKnown}
              />
              No
            </label>
          </radiogroup>
        </li>
        <ToggleDisplay
          show={generalContractor.isKnown.value === 'yes'}
          render={() => (
            <li>
              <GeneralContractorFieldSet generalContractor={generalContractor} />
            </li>
          )}
        />
        <li>
         <span className="area-label"> Will there be occupancy during the project? </span>
          <radiogroup>
            <label>
              <PureRadio
                value="yes"
                field={occupancyDetails.willHave}
              />
              Yes
            </label>
            <label>
              <PureRadio
                value="no"
                field={occupancyDetails.willHave}
              />
              No
            </label>
          </radiogroup>
        </li>
        <ToggleDisplay
          show={occupancyDetails.willHave.value === 'yes'}
          render={() => (
            <li>
              <OccupancyDetailsFieldSet occupancyDetails={occupancyDetails} />
            </li>
          )}
        />
        <li>
          <span className="area-label">Will there be demo of exterior walls or roof? </span>
          <radiogroup>
            <label>
              <PureRadio
                value="yes"
                field={demoDetails.willHave}
              />
              Yes
            </label>
            <label>
              <PureRadio
                value="no"
                field={demoDetails.willHave}
              />
              No
            </label>
          </radiogroup>
        </li>
        <ToggleDisplay
          show={demoDetails.willHave.value === 'yes'}
          render={() => (
            <li>
              <DemoDetailsFieldSet demoDetails={demoDetails} />
            </li>
          )}
        />
        <li>
          <span className="area-label">Has work started on this project? </span>
          <radiogroup>
            <label>
              <PureRadio
                value="yes"
                field={workDetails.hasStarted}
              />
              Yes
            </label>
            <label>
              <PureRadio
                value="no"
                field={workDetails.hasStarted}
              />
              No
            </label>
          </radiogroup>
        </li>
        <ToggleDisplay
          show={workDetails.hasStarted.value === 'yes'}
          render={() => (
            <li>
              <WorkDetailsFieldSet workDetails={workDetails} />
            </li>
          )}
        />
        <li>
          <span className="area-label">Does this project require excess coverage?</span>
          <radiogroup>
            <label>
              <PureRadio
                value="yes"
                field={excessDetails.required}
              />
              Yes
            </label>
            <label>
              <PureRadio
                value="no"
                field={excessDetails.required}
              />
              No
            </label>
          </radiogroup>
        </li>
        <ToggleDisplay
          show={excessDetails.required.value === 'yes'}
          render={() => (
            <li>
              <ExcessDetailsFieldSet excessDetails={excessDetails} />
            </li>
          )}
        />
        <li>
          <label>
           <span className="area-label">General Comments</span>
            <PureTextArea
              field={generalComments}
            />
          </label>
        </li>
        <li>
          <ContactInfoFieldSet contactInfo={contactInfo} />
        </li>

      </ul>
      <button className="button getQuote" type="submit">Get Quote</button>
    </form>
  );
}

export default decorator(RatingForm);
