import React from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';

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

  console.log('errors', errors)

  return (
    <form className="RatingForm__container" onSubmit={handleSubmit}>
      <h3><b><u>Owners & Contractors Protective Form</u></b></h3>
      <ul className="no-bullets">

        <li>
          <NamedInsuredCredentialsFieldSet
            primaryNamedInsured={primaryNamedInsured}
            errors={errors.primaryNamedCredentials}
            />
        </li>

        <li>
          <TotalCostFieldSet
            costs={costs}
            errors={errors.totalCost}
            />
        </li>

        <li>
          <TermFieldSet
            term={term}
            errors={errors.projectTerm}
            />
        </li>

        <li>
          <FinishDateFieldSet
            anticipatedFinishDate={anticipatedFinishDate}
            errors={errors.finishDate}
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
            errors={errors.glCarrier}
            />
        </li>

        <li>
          <ExpirationDateFieldSet
            glExpirationDate={glExpirationDate}
            errors={errors.expirationDate}
            />
        </li>

        <li>
          <ExcessLimitsFieldSet
            glLimits={glLimits}
            errors={errors.excessLimits}
            />
        </li>

        <li>
          <AddressFieldSet
            address={address}
            nycha={nycha}
            errors={errors.address}
          />
        </li>

        <li>
          <VerticalExpansionFieldSet
            overFourFloors={overFourFloors}
            errors={errors.verticalExpansion}
          />
        </li>

        <li>
          <SpecificFloorsFieldSet
            projectDefinedAreaScope={projectDefinedAreaScope}
            projectDefinedAreaScopeDetails={projectDefinedAreaScopeDetails}
            errors={errors.specificFloors}
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
            errors={errors.insuredInvolved}
          />
        </li>

        <li>
          <ProjectRequirementsFieldSet
            projectRequirements={projectRequirements}
            errors={errors.projectRequirements}
          />
        </li>

        <li>
          <LimitsFieldSet
            limitsRequested={limitsRequested}
            errors={errors.limits}
          />
        </li>

        <li>
          <ContactInfoFieldSet
            contactInfo={contactInfo}
            errors={errors.contactInfo}
          />
        </li>
      </ul>

      <button className="button getQuote" type="submit">Get Quote</button>
      <ReactTooltip className="tooltip"/>
    </form>
  );
}

export default decorator(
  connect((state) => {

    return ({
      errors: state.error.ratingOCP || {}
    });

  })(ContractorForm)
);
