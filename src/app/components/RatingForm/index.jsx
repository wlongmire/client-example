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

const RatingForm = React.createClass({
  componentWillUnmount() {
    this.props.dispatch({
      type: 'SET_FORM_ERROR',
      payload: {
        ratingOI:{}
      }
    });
  },

  render() {
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
    } = this.props;

    return (
      <form className="RatingForm__container" onSubmit={handleSubmit}>

        <NamedInsuredCredentialsFieldSet
          primaryNamedInsured={primaryNamedInsured}
          namedInsuredAddress={namedInsuredAddress}
          errors={errors.primaryNamedCredentials}
          />

        <SecondaryNamedInsuredFieldSet
          otherNamedInsured={otherNamedInsured}
          hasOtherNamedInsured={hasOtherNamedInsured}
          greaterThanTwoNamed={greaterThanTwoNamed}
          errors={errors.secondaryNamedInsured}
          />

        <AdditionalInsuredFieldSet
          hasAdditionalInsured={hasAdditionalInsured}
          additionalInsured={additionalInsured}
          errors={errors.additionalInsured}
        />

        <ProjectAddressFieldSet
          address={address}
          errors={errors.projectAddress}
        />

        <ProjectScopeFieldSet
          scope={scope}
          errors={errors.projectScope}
        />

        <ProjectTermFieldSet
          term={term}
          errors={errors.projectTerm}
        />

        <ProjectValueFieldSet
          costs={costs}
          errors={errors.projectValue}
        />

        <TowerCraneFieldSet
          towerCraneUse={towerCraneUse}
          errors={errors.towerCrane}
        />

        <KnownContractorFieldSet
          generalContractor={generalContractor}
          errors={errors.knownContractor}
        />

        <OccupancyFieldSet
          occupancyDetails={occupancyDetails}
          errors={errors.occupancy}
        />

        <DemoFieldSet
          demoDetails={demoDetails}
          errors={errors.demo}
        />

        <HasWorkStartedFieldSet
          workDetails={workDetails}
          errors={errors.hadWorkStarted}
        />

        <ExcessFieldSet
          excessDetails={excessDetails}
          errors={errors.excess}
        />

        <GeneralCommentsFieldSet
          generalComments={generalComments}
          errors={errors.generalComments}
        />

        <ContactInfoFieldSet
          contactInfo={contactInfo}
          errors={errors.contactInfo}
        />

        <button className="button getQuote" type="submit">Get Quote</button>
        <ReactTooltip className="tooltip"/>
      </form>
    );
  }
});

export default decorator(
  connect((state) => {

    return ({
      errors: state.error.ratingOI || {}
    });

  })(RatingForm)
);
