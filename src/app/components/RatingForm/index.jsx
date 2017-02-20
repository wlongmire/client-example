import React from 'react';
import { connect } from 'react-redux';

import ReactTooltip from 'react-tooltip';

import NamedInsuredCredentialsFieldSet from './NamedInsuredCredentialsFieldSet';
import SecondaryNamedInsuredFieldSet from   './SecondaryNamedInsuredFieldSet';
import AdditionalInsuredFieldSet from       './AdditionalInsuredFieldSet';
import ProjectAddressFieldSet from          './ProjectAddressFieldSet';
import ProjectScopeFieldSet from            './ProjectScopeFieldSet';
import ProjectTermFieldSet from             './ProjectTermFieldSet';
import ProjectValueFieldSet from            './ProjectValueFieldSet';
import TowerCraneFieldSet from              './TowerCraneFieldSet';
import KnownContractorFieldSet from         './KnownContractorFieldSet';
import OccupancyFieldSet from               './OccupancyFieldSet';
import DemoFieldSet from                    './DemoFieldSet';
import ExcessFieldSet from                  './ExcessFieldSet';
import GeneralCommentsFieldSet from         './GeneralCommentsFieldSet';
import ContactInfoFieldSet from             './ContactInfoFieldSet';
import HasWorkStartedFieldSet from          './HasWorkStartedFieldSet';

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
      generalComments,
      type
    },
    errors,
    handleSubmit
  } = props;

  return (
    <form className="RatingForm__container" onSubmit={handleSubmit}>
      <ul className="no-bullets">

        <li key="1">
          <NamedInsuredCredentialsFieldSet
            primaryNamedInsured={primaryNamedInsured}
            namedInsuredAddress={namedInsuredAddress}
            errors={errors.primaryNamedCredentials}
            />
        </li>


        <li key="2">
          <SecondaryNamedInsuredFieldSet
            otherNamedInsured={otherNamedInsured}
            hasOtherNamedInsured={hasOtherNamedInsured}
            greaterThanTwoNamed={greaterThanTwoNamed}
            errors={errors.secondaryNamedInsured}
            />
        </li>

        <li key="3">
          <AdditionalInsuredFieldSet
            hasAdditionalInsured={hasAdditionalInsured}
            additionalInsured={additionalInsured}
            errors={errors.additionalInsured}
          />
        </li>

        <li key="4">
          <ProjectAddressFieldSet
            address={address}
            errors={errors.projectAddress}
          />
        </li>

        <li key="5">
          <ProjectScopeFieldSet
            scope={scope}
            errors={errors.projectScope}
          />
        </li>

        <li key="6">
          <ProjectTermFieldSet
            term={term}
            errors={errors.projectTerm}
          />
        </li>

        <li key="7">
          <ProjectValueFieldSet
            costs={costs}
            errors={errors.projectValue}
          />
        </li>

        <li key="8">
          <TowerCraneFieldSet
            towerCraneUse={towerCraneUse}
            errors={errors.towerCrane}
          />
        </li>

        <li key="9">
          <KnownContractorFieldSet
            generalContractor={generalContractor}
            errors={errors.knownContractor}
          />
        </li>

        <li key="10">
          <OccupancyFieldSet
            occupancyDetails={occupancyDetails}
            errors={errors.occupancy}
          />
        </li>

        <li key="11">
          <DemoFieldSet
            demoDetails={demoDetails}
            errors={errors.demo}
          />
        </li>

        <li key="12">
          <HasWorkStartedFieldSet
            workDetails={workDetails}
            errors={errors.hadWorkStarted}
          />
        </li>

        <li key="13">
          <ExcessFieldSet
            excessDetails={excessDetails}
            errors={errors.excess}
          />
        </li>

        <li key="14">
          <GeneralCommentsFieldSet
            generalComments={generalComments}
            errors={errors.generalComments}
          />
        </li>

        <li key="15">
          <ContactInfoFieldSet contactInfo={contactInfo} />
          errors={errors.contactInfo}
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
      errors: state.error.ratingOI || {}
    });

  })(RatingForm)
);
