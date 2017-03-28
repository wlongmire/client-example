import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import DialogBox from 'components/shared/DialogBox';
import OIConfirmationModal from './ConfirmationModal';
import { handleSubmit } from './decorators/reduxForm/handleSubmit';

import * as actions from 'app/routes/Submissions/actions';

import {
  Button,
  ButtonGroup
} from 'react-bootstrap';

import NamedInsuredCredentialsFieldSet from './NamedInsuredCredentialsFieldSet';
import NamedInsuredAddressFieldSet from     './NamedInsuredAddressFieldSet';
import SecondaryNamedInsuredFieldSet from   './SecondaryNamedInsuredFieldSet';
import AdditionalInsuredFieldSet from       './AdditionalInsuredFieldSet';
import ProjectAddressFieldSet from          './ProjectAddressFieldSet';
import ProjectScopeFieldSet from            './ProjectScopeFieldSet';
import ProjectTermFieldSet from             './ProjectTermFieldSet';
import ProjectValueFieldSet from            './ProjectValueFieldSet';
import TowerCraneFieldSet from              './TowerCraneFieldSet';
import KnownContractorFieldSet from         './KnownContractorFieldSet';
import SpecificFloorsFieldSet from          './SpecificFloorsFieldSet';
import OccupancyFieldSet from               './OccupancyFieldSet';
import DemoFieldSet from                    './DemoFieldSet';
import ExcessFieldSet from                  './ExcessFieldSet';
import GeneralCommentsFieldSet from         './GeneralCommentsFieldSet';
import ContactInfoFieldSet from             './ContactInfoFieldSet';
import HasWorkStartedFieldSet from          './HasWorkStartedFieldSet';

import decorator from './decorators';

const RatingForm = React.createClass({
  getInitialState() {
    return({
      showConfirmationDialog:false
    });
  },

  componentWillUnmount() {
    this.props.dispatch({
      type: 'SET_FORM_ERROR',
      payload: {
        ratingOI:{}
      }
    });
  },

  handleCancelDialog() {
    this.props.dispatch({
      type: 'SET_CONFIRMATION_DIALOG_OI',
      value: false
    });
  },

  handleSubmitQuote() {
    this.props.dispatch(handleSubmit(this.props.values)).then(()=>{

      this.props.dispatch({
        type: 'SET_CONFIRMATION_DIALOG_OI',
        value: false
      });

      // update the home submissions table after submission has been created
      this.props.getSubmissions(this.props.user['_brokerId']);

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
        projectDefinedAreaScope,
        projectDefinedAreaScopeDetails,
        generalComments,
        type
      },
      errors,
      handleSubmit
    } = this.props;

    const submission = Object.assign({}, this.props.fields);
    delete submission["_meta"];

    const title = (localStorage.getItem('editing') === "true")?"Owner's Interest Editing":"Owner's Interest Submission"

    return (
      <div>
        <form className="RatingForm__container" onSubmit={handleSubmit}>
          <h3>{title}</h3>

          <NamedInsuredCredentialsFieldSet
            primaryNamedInsured={primaryNamedInsured}
            namedInsuredAddress={namedInsuredAddress}
            errors={errors.primaryNamedCredentials}
            />

          <NamedInsuredAddressFieldSet
            namedInsuredAddress={namedInsuredAddress}
            errors={errors.primaryNamedCredentials}
          />

          <SpecificFloorsFieldSet
            projectDefinedAreaScope={projectDefinedAreaScope}
            projectDefinedAreaScopeDetails={projectDefinedAreaScopeDetails}
            errors={errors.specificFloors}
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

        <Button bsStyle="primary" className="getQuote" type="submit">Process Submission</Button>
        <ReactTooltip className="tooltip"/>

        <DialogBox
          custom_class="confirmationDialog"
          title="Is your data correct?"
          subtitle="Double check your values and push Get Quote to confirm"
          show={this.props.showConfirmationDialog}
          >
          <div>
            <OIConfirmationModal submission={submission} />

            <ButtonGroup className="submitButtons">
              <Button bsStyle="primary" onClick={this.handleSubmitQuote}>Get Quote</Button>
              <Button onClick={this.handleCancelDialog}>Cancel</Button>
            </ButtonGroup>
          </div>

        </DialogBox>

      </form>

      </div>
    );
  }
});

export default decorator(
  connect((state) => {
    return ({
      user: state.user,
      showConfirmationDialog: state.interface.oi.showConfirmationDialog,
      values: state.interface.values,
      errors: state.error.ratingOI || {}
    });

  }, actions)(RatingForm)
);
