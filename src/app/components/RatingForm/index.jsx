import React from 'react';
import { connect } from 'react-redux';

import ReactTooltip from 'react-tooltip';

import DialogBox from 'components/shared/DialogBox';

import { handleSubmit } from './decorators/reduxForm/handleSubmit';

import {
  Button,
  ButtonGroup
} from 'react-bootstrap';

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

const OIConfirmation = React.createClass({
  render() {
    const { submission } = this.props;

    return (
      <div className="confirmation__container">
        <div className="item">
          <span className="left">Named Insured:</span>
          <span className="text"> { submission.primaryNamedInsured.value }</span>
        </div>

        <div className="item">
          <span className="left">Address:</span>
          <span className="text"> { submission.namedInsuredAddress.street.value } { submission.namedInsuredAddress.city.value }, { submission.namedInsuredAddress.state.value } { submission.namedInsuredAddress.zip.value }</span>
        </div>

        <div className="item">
          <span className="left">Second Named Insured:</span>
          <span className="text">{ submission.hasOtherNamedInsured.value }</span>
        </div>

        <div className="item">
          <span className="left">Additional Insured:</span>
          <span className="text">{ submission.hasAdditionalInsured.value }</span>
        </div>

        <div className="item">
          <span className="left">Project Address:</span>
          <span className="text">{ submission.address.street.value } { submission.address.city.value }, { submission.address.state.value } { submission.address.zip.value } </span>
        </div>

        <div className="item"><span className="left">Project Scope:</span>
          <span className="text">{ submission.scope.value }</span>
        </div>

        <div className="item">
          <span className="left">Project Length:</span>
          <span className="text">{ submission.term.value }</span>
        </div>

        <div className="item">
          <span className="left">Construction Costs:</span>
          <span className="text">{ submission.costs.value }</span>
        </div>

        <div className="item">
          <span className="left">Will there be use of a tower crane on this project:</span>
          <span className="text">{ submission.towerCraneUse.value }</span>
        </div>

        <div className="item">
          <span className="left">Is the General Contractor known:</span>
          <span className="text">{ submission.generalContractor.isKnown.value }</span>
        </div>

        <div className="item"><span className="left">Will there be occupancy during the project:</span>
          <span className="text">{ submission.occupancyDetails.willHave.value }</span>
        </div>

        <div className="item">
          <span className="left">Will there be demo of exterior walls or roof:</span>
          <span className="text">{ submission.demoDetails.willHave.value }</span>
        </div>

        <div className="item">
          <span className="left">Has work started on this project:</span>
          <span className="text">{ submission.workDetails.hasStarted.value }</span>
        </div>

        <div className="item">
          <span className="left">Does this project require excess coverage:</span>
          <span className="text">{ submission.excessDetails.required.value }</span>
        </div>

        <div className="item">
          <span className="left">General Comments:</span>
          <span className="text">{ submission.generalComments.value }</span>
        </div>

        <div className="item">
          <span className="left">Contact info to receive your indication:</span>
          <span className="text">{ submission.contactInfo.email.value }</span>
        </div>

    </div>);
  }
});


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

    const submission = Object.assign({}, this.props.fields);
    delete submission["_meta"];

    return (
      <div>
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

        <Button bsStyle="primary" className="getQuote" type="submit">Process Submission</Button>
        <ReactTooltip className="tooltip"/>

        <DialogBox
          custom_class="confirmationDialog"
          title="Is your data correct?"
          subtitle="Double check your values and push Get Quote to confirm"
          show={this.props.showConfirmationDialog}
          >
          <div>
            <OIConfirmation submission={submission} />

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
      showConfirmationDialog: state.interface.oi.showConfirmationDialog,
      values: state.interface.values,
      errors: state.error.ratingOI || {}
    });

  })(RatingForm)
);
