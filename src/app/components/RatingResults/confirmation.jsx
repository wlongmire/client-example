import React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

import styles from './styles';

import * as actions from '../RatingForm/decorators/reduxForm/handleSubmit';


function ConfirmationView(props) {

  const submission = props.location.state.payload;

  console.log(props);

  return (
    <div className="confirmation__container">
       <h2 className="title">Review Details</h2>
       <hr />
       <div className="item"><span className="left">Named Insured:</span><span className="text"> { submission.primaryNamedInsured }</span></div>
       <div className="item"><span className="left">Address:</span><span className="text"> { submission.namedInsuredAddress.street } { submission.namedInsuredAddress.state }, { submission.namedInsuredAddress.zip }</span>
       </div>
       <div className="item"><span className="left">Second Named Insured:</span><span className="text">{ submission.hasOtherNamedInsured }</span></div>
       <div className="item"><span className="left">Additional Insured:</span><span className="text">{ submission.additionalInsured.name }</span></div>
       <div className="item"><span className="left">Project Address:</span> <span className="text">{ submission.address.street }</span></div>
       <div className="item"><span className="left">Project Scope:</span> <span className="text">{ submission.scope }</span></div>
       <div className="item"><span className="left">Project Length:</span><span className="text">{ submission.term }</span></div>
       <div className="item"><span className="left">Construction Costs:</span> <span className="text">{ submission.costs }</span></div>
       <div className="item"><span className="left">Will there be use of a tower crane on this project:</span> <span className="text">{ submission.towerCraneUse }</span></div>
       <div className="item"><span className="left">Is the General Contractor known:</span> <span className="text">{ submission.generalContractor.name }</span></div>
       <div className="item"><span className="left">Will there be occupancy during the project:</span> <span className="text">{ submission.occupancyDetails.willHave }</span></div>
       <div className="item"><span className="left">Will there be demo of exterior walls or roof:</span><span className="text">{ submission.demoDetails.willHave }</span></div>
       <div className="item"><span className="left">Has work started on this project:</span> <span className="text">{ submission.workDetails.hasStarted }</span></div>
       <div className="item"><span className="left">Does this project require excess coverage:</span> <span className="text">{ submission.excessDetails.required }</span></div>
       <div className="item"><span className="left">General Comments:</span> <span className="text">{ submission.generalComments }</span></div>
       <div className="item"><span className="left">Contact info to receive your indication:</span> <span className="text">{ submission.contactInfo.email }</span></div>
      <div className="buttonWrapper">
      <button className="button" onClick={()=>window.history.back()}>Go back</button>
      <button className="button pull-right getQuote" onClick={()=> props.handleSubmit(submission)}>Get Quote</button>
      </div>
    </div>
  );
}

// function mapStateToProps(state){
//   return {
//     selected: state.routing
//   };
// }

export default connect(null, actions)(ConfirmationView);
