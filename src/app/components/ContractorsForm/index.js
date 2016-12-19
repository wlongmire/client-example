import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureRadio from 'components/shared/PureRadio';
import PureOptionSelect from 'components/shared/PureOptionSelect';
import PureTextArea from 'components/shared/PureTextArea';
import ToggleDisplay from 'components/shared/ToggleDisplay';
import ReactTooltip from 'react-tooltip';

import styles from './styles';

import AddressFieldSet from 'components/RatingForm/AddressFieldSet';
import GeneralContractorFieldSet from 'components/RatingForm/GeneralContractorFieldSet';

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
      isSupervisingSubs,
      projectRequirements,
      limitsRequested,
      anticipatedFinishDate,
      generalContractor: {
        name,
        glCarrier,
        glLimits,
        glExpirationDate
      },
      type
    },
    handleSubmit
  } = props;
  return (
    <form className="RatingForm__container" onSubmit={handleSubmit}>
   
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
              type="number"
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
          <AddressFieldSet address={address} type='project' />
        </li>
        <li>
          <label>
          <span className="area-label" data-tip="Defined area of project Scope"> What is the defined area of project Scope?</span>
            <PureInput
              type="text"
              field={projectDefinedAreaScope}
              placeholder="Defined area of project Scope"
            />
          </label>
        </li>
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
      </ul>
      <button className="button getQuote" type="submit">Get Quote</button>
      <ReactTooltip className="tooltip"/>
    </form>
  );
}

export default decorator(ContractorForm);

