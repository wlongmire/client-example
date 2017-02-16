import React from 'react';
import CurrencyInput from 'react-currency-masked-input';

import PureInput from 'components/shared/PureInput';
import PureRadio from 'components/shared/PureRadio';
import PureOptionSelect from 'components/shared/PureOptionSelect';
import PureTextArea from 'components/shared/PureTextArea';
import ToggleDisplay from 'components/shared/ToggleDisplay';
import ReactTooltip from 'react-tooltip';

import styles from './styles';

import AddressFieldSet from 'components/ContractorsForm/AddressFieldSet';
import GeneralContractorFieldSet from 'components/RatingForm/GeneralContractorFieldSet';
import ContactInfoFieldSet from 'components/RatingForm/ContactInfoFieldSet';

import decorator from './decorators';

const limits = [{12:'1m/2m'},{22:'2m/2m'},{24:'2m/4m'},{33:'3m/3m'},{44:'4m/4m'},{55:'5m/5m'} ];

function ContractorForm(props) {

  const {
    fields: {
      primaryNamedInsured,
      scope,
      term,
      costs,
      address,
      projectDefinedAreaScope,
      projectDefinedAreaScopeDetails,
      isSupervisingSubs,
      projectRequirements,
      limitsRequested,
      anticipatedFinishDate,
      overFourFloors,
      nycha,
      generalContractor: {
        name,
        glCarrier,
        glLimits,
        glExpirationDate
      },
      type,
      contactInfo
    },
    handleSubmit
  } = props;
  return (
    <form className="RatingForm__container" onSubmit={handleSubmit}>
      <h3><b><u>Owners & Contractors Protective Form</u></b></h3>
      <ul className="no-bullets">
        <li>
          <label>
            <span
            className="area-label"
            data-tip="This entity must be named as the Owner in the contract receiving hold harmless, indemnification and additional insured status from the hired General Contractor">Who is the Primary Named Insured?</span>
            <PureInput
              type="text"
              field={primaryNamedInsured}
              placeholder="Input Value"
            />
          </label>
        </li>
        <li>
          <label>
           <span
           className="area-label"
           data-tip="Total Costs means the total cost of all work let or sublet including: a) the cost of all labor, materials and equipment furnished, used or delivered for use in the execution of the work and b) all fees bonuses or commissions made, paid or due.">What is the total cost of this project?</span>
            <PureInput
              type="text"
              field={costs}
            />
          </label>
        </li>
        <li>
          <label>
          <span className="area-label" data-tip="provide the anticipated project term. Note: Maximum length of term cannot exceed 60 months."> What is the term of the project, in months?</span>
            <PureInput
              type="number"
              field={term}
            />
          </label>
        </li>
        <li>
          <label>
          <span className="area-label" data-tip="provide the anticipated project term. Note: Maximum length of term cannot exceed 60 months."> What is the Anticipated Finish Date of Project?</span>
            <PureInput
              type="date"
              field={anticipatedFinishDate}
            />
          </label>
        </li>
        <li>
          <label>
          <span className="area-label" data-tip="Name of General Contractor"> What is the Name of the Designated Contractor?</span>
            <PureInput
              type="text"
              field={name}
              placeholder="Name of General Contractor"
            />
          </label>
        </li>
        <li>
          <label>
          <span className="area-label" data-tip="Name of General Contractor"> Who is the GL Carrier of Contractor?</span>
            <PureInput
              type="text"
              field={glCarrier}
              placeholder="GL Carrier of Contractor"
            />
          </label>
        </li>
        <li>
          <label>
          <span className="area-label" data-tip="Expiration Date of the Contractor's GL Policy"> When is the Expiration Date of the Contractor's GL Policy?</span>
            <PureInput
              type="date"
              field={glExpirationDate}
              placeholder="Expiration Date"
            />
          </label>
        </li>
        <li>
          <label>
          <span className="area-label" data-tip="Excess limits of the Contractor's primary Policy"> What are the Excess limits of the Contractor's primary Policy?</span>
            <PureInput
              type="text"
              field={glLimits}
              placeholder="Excess limits"
            />
          </label>
        </li>
        <li>
          <AddressFieldSet address={address} nycha={nycha} type='project' />
        </li>

        <li>
          <span className="area-label" data-tip="Does the project include the addition of any stories or vertical expansion?">
          Does the project include the addition of any stories or vertical expansion?
          </span>
            <radiogroup>
              <label>
                <PureRadio
                  value="yes"
                  field={overFourFloors}
                />
                Yes
              </label>
              <label>
                <PureRadio
                  value="no"
                  field={overFourFloors}
                />
                No
              </label>
            </radiogroup>
        </li>

      <li>
        <span className="area-label" data-tip="Is project limited to specific floors?">Is project limited to specific floors?</span>
          <radiogroup>
            <label>
              <PureRadio
                value="yes"
                field={projectDefinedAreaScope}
              />
              Yes
            </label>
            <label>
              <PureRadio
                value="no"
                field={projectDefinedAreaScope}
              />
              No
            </label>
          </radiogroup>
        </li>
      <ToggleDisplay
          show={projectDefinedAreaScope.value === 'yes'}
          render={() => (
            <fieldset className="sub-questions">
            <span className="area-label-sub">Give details.</span>
            <ul>
              <li>
              <label>
                <PureTextArea
                field={projectDefinedAreaScopeDetails}
                />
                </label>
              </li>
            </ul>
            </fieldset>
          )}
        />

         <li>
          <label>
           <span className="area-label double" data-tip="Please provide as descriptive of a scope of work as possible including end use.">What is the scope of work for this project?</span>
            <PureTextArea
              field={scope}
            />
          </label>
        </li>
        <li>
           <span className="area-label">Will the named insured be involved with any supervision or oversight of the project?</span>
          <radiogroup>
            <label>
              <PureRadio
                value="yes"
                field={isSupervisingSubs}
              />
              Yes
            </label>
            <label>
              <PureRadio
                value="no"
                field={isSupervisingSubs}
              />
              No
            </label>
          </radiogroup>
        </li>
        <li>
           <span className="area-label">Does the project require any of the following:</span>
           <small>Blasting, Airport Runways, Bridge Construction, Parking Garages/Decks, Dams, Underground Tunneling for Subways or Mines</small>
          <radiogroup>
            <label>
              <PureRadio
                value="yes"
                field={projectRequirements}
              />
              Yes
            </label>
            <label>
              <PureRadio
                value="no"
                field={projectRequirements}
              />
              No
            </label>
          </radiogroup>
        </li>
        <li>
           <span className="area-label">What limits are being requested for this OCP?</span>
            <label className="display">
            <PureOptionSelect
              field={limitsRequested}
              className="select"
            >
              <option value=""></option>
              {
                limits.map((limit, key) => (
                  <option key={key} value={Object.keys(limit)[0]}>{limit[Object.keys(limit)[0]]}</option>
                ))
              }
            </PureOptionSelect>
           </label>
        </li>
        <li>
          <ContactInfoFieldSet contactInfo={contactInfo} />
        </li>
      </ul>
      <button className="button getQuote" type="submit">Get Quote</button>
      <ReactTooltip className="tooltip"/>
    </form>
  );
}

export default decorator(ContractorForm);

