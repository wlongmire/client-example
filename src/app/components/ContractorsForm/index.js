import React from 'react';
import CurrencyInput from 'react-currency-masked-input';

import PureInput from 'components/shared/PureInput';
import PureRadio from 'components/shared/PureRadio';
import PureOptionSelect from 'components/shared/PureOptionSelect';
import PureTextArea from 'components/shared/PureTextArea';
import ToggleDisplay from 'components/shared/ToggleDisplay';
import ReactTooltip from 'react-tooltip';

import styles from './styles';

import NamedInsuredCredentialsFieldSet from './NamedInsuredCredentialsFieldSet';
import TotalCostFieldSet from               './TotalCostFieldSet';
import TermFieldSet from                    './TermFieldSet';
import FinishDateFieldSet from              './FinishDateFieldSet';
import GeneralContractorFieldSet from       './GeneralContractorFieldSet';
import GLCarrierFieldSet from               './GLCarrierFieldSet';
import ExpirationDateFieldSet from          './ExpirationDateFieldSet';
import ExcessLimitsFieldSet from            './ExcessLimitsFieldSet';
import AddressFieldSet from                 './AddressFieldSet';
import VerticalExpansionFieldSet from       './VerticalExpansionFieldSet';
import SpecificFloorsFieldSet from          './SpecificFloorsFieldSet';
import WorkDescriptionFieldSet from         './WorkDescriptionFieldSet';
import InsuredInvolvedFieldSet from         './InsuredInvolvedFieldSet';
import ProjectRequirementsFieldSet from     './ProjectRequirementsFieldSet';
import LimitsFieldSet from                  './LimitsFieldSet';
import ContactInfoFieldSet from             './ContactInfoFieldSet';

import decorator from './decorators';

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
    handleSubmit,
    errors
  } = props;

  return (
    <form className="RatingForm__container" onSubmit={handleSubmit}>
      <h3><b><u>Owners & Contractors Protective Form</u></b></h3>
      <ul className="no-bullets">

        <li>
          <NamedInsuredCredentialsFieldSet
            primaryNamedInsured={primaryNamedInsured}
            errors={errors}
            />
        </li>

        <li>
          <TotalCostFieldSet
            costs={costs}
            errors={errors}
            />
        </li>

        <li>
          <TermFieldSet
            term={term}
            errors={errors}
            />
        </li>

        <li>
          <FinishDateFieldSet
            anticipatedFinishDate={anticipatedFinishDate}
            errors={errors}
            />
        </li>

        <li>
          <GeneralContractorFieldSet
            name={name}
            errors={errors}
            />
        </li>

        <li>
          <GLCarrierFieldSet
            glCarrier={glCarrier}
            errors={errors}
            />
        </li>

        <li>
          <ExpirationDateFieldSet
            glExpirationDate={glExpirationDate}
            errors={errors}
            />
        </li>

        <li>
          <ExcessLimitsFieldSet
            glLimits={glLimits}
            errors={errors}
            />
        </li>

        <li>
          <AddressFieldSet
            address={address}
            nycha={nycha}
            errors={errors}
          />
        </li>

        <li>
          <VerticalExpansionFieldSet
            overFourFloors={overFourFloors}
            errors={errors}
          />
        </li>

        <li>
          <SpecificFloorsFieldSet
            projectDefinedAreaScope={projectDefinedAreaScope}
            projectDefinedAreaScopeDetails={projectDefinedAreaScopeDetails}
            errors={errors}
          />
        </li>

        <li>
          <WorkDescriptionFieldSet
            scope={scope}
            errors={errors}
          />
        </li>

        <li>
          <InsuredInvolvedFieldSet
            isSupervisingSubs={isSupervisingSubs}
            errors={errors}
          />
        </li>

        <li>
          <ProjectRequirementsFieldSet
            projectRequirements={projectRequirements}
            errors={errors}
          />
        </li>

        <li>
          <LimitsFieldSet
            limitsRequested={limitsRequested}
            errors={errors}
          />
        </li>

        <li>
          <ContactInfoFieldSet
            contactInfo={contactInfo}
            errors={errors}
          />
        </li>
      </ul>
      <button className="button getQuote" type="submit">Get Quote</button>
      <ReactTooltip className="tooltip"/>
    </form>
  );
}

export default decorator(ContractorForm);
