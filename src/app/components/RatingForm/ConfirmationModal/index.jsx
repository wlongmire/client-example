import React from 'react';
import { connect } from 'react-redux';

import {
  Button,
  ButtonGroup
} from 'react-bootstrap';

const OIConfirmationModal = React.createClass({
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

export default OIConfirmationModal;
