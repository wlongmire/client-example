import React from 'react';
import { connect } from 'react-redux';

import PureInput from 'components/shared/PureInput';
import PureRadio from 'components/shared/PureRadio';
import PureOptionSelect from 'components/shared/PureOptionSelect';
import PureTextArea from 'components/shared/PureTextArea';
import ToggleDisplay from 'components/shared/ToggleDisplay';
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

        <li>
          <NamedInsuredCredentialsFieldSet
            primaryNamedInsured={primaryNamedInsured}
            namedInsuredAddress={namedInsuredAddress}
            errors={errors}
            />
        </li>


        <li>
          <SecondaryNamedInsuredFieldSet
            otherNamedInsured={otherNamedInsured}
            hasOtherNamedInsured={hasOtherNamedInsured}
            greaterThanTwoNamed={greaterThanTwoNamed}
            errors={errors}
            />
        </li>

        <li>
          <AdditionalInsuredFieldSet
            hasAdditionalInsured={hasAdditionalInsured}
            additionalInsured={additionalInsured}
            errors={errors}
          />
        </li>

        <li>
          <ProjectAddressFieldSet
            address={address}
            errors={errors}
          />
        </li>

        <li>
          <ProjectScopeFieldSet
            scope={scope}
            errors={errors}
          />
        </li>

        <li>
          <ProjectTermFieldSet
            term={term}
            errors={errors}
          />
        </li>

        <li>
          <ProjectValueFieldSet
            costs={costs}
            errors={errors}
          />
        </li>

        <li>
          <TowerCraneFieldSet
            towerCraneUse={towerCraneUse}
            errors={errors}
          />
        </li>

        <li>
          <KnownContractorFieldSet
            generalContractor={generalContractor}
            errors={errors}
          />
        </li>

        <li>
          <OccupancyFieldSet
            occupancyDetails={occupancyDetails}
            errors={errors}
          />
        </li>

        <li>
          <DemoFieldSet
            demoDetails={demoDetails}
            errors={errors}
          />
        </li>

        <li>
          <HasWorkStartedFieldSet
            workDetails={workDetails}
            errors={errors}
          />
        </li>

        <li>
          <ExcessFieldSet
            excessDetails={excessDetails}
            errors={errors}
          />
        </li>

        <li>
          <GeneralCommentsFieldSet
            generalComments={generalComments}
            errors={errors}
          />
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

export default decorator(
  connect((state) => {

    return ({
      errors: state.error.ratingOI || {}
    });

  })(RatingForm)
);
