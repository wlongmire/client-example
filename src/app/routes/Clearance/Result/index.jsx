import React, { Component } from 'react'

import { LinkContainer } from 'react-router-bootstrap'
import mx from 'app/utils/MixpanelInterface'
import { connect } from 'react-redux'
import { ButtonGroup, Button, Panel } from 'react-bootstrap'
import ToggleDisplay from 'components/shared/ToggleDisplay'
import config from 'config'

class Result extends Component {
  render() {
    const clearanceFailMessage =
    (config.clearanceFailFlag === 'true') ?
    (<h4>Your submission <b>has not</b> passed clearance and has been sent to an Under Writer for review. Should this be declined in error, we will contact you for the full submission. If you would like to get in touch directly, please contact Jessica Buelow <b>jbuelow@colonyspecialty.com.</b></h4>) :
    (<h4>If we have blocked you in error, please message us through the <img src="https://s3.amazonaws.com/ownersedge-cdn/images/chatIcon.png" /> icon below.</h4>)

    const result = (this.props.result.success)?{
      title: "This Submission Has Passed Clearance!",
      subtitle: "You are the first to submit this insured for review. Now we can enter additional pricing information.",
      additionalContent: "",
      buttonLabel: "Fill out Remaining Information"
    }:{
      title: "This Submission Did Not Pass Clearance.",
      subtitle: "Your business as listed below matches a previously processed submission.",
      additionalContent: <div className="additionalContent">
        {clearanceFailMessage}
    </div>,
      buttonLabel: "Reenter Clearance Information"
    }


    const showMatchResults = false

  // mixpanel events
    if (this.props.result.success) {
      mx.customEvent(
          "submission",
          "passClearance",
          { "Type": this.props.submission.type }
          );
    } else {
      mx.customEvent(
          "submission",
          "failClearance",
          { 
              "Type": this.props.submission.type,
              "matches": this.props.result.matches,
          });
    }

    const matches = (showMatchResults && !this.props.result.success)?
        (this.props.result.matches.map((m, idx)=> (
            <div key={idx} className="match">
                <div>
                    <h4>Name:</h4><h5>{m.name}</h5>
                </div>

                <div>
                    <h4>Address:</h4><h5>{m.address}</h5>
                </div>
            </div>
        ))):(
            <div className="match">
                <h4>Name:</h4><h5>{this.props.input.primaryInsuredName}</h5>
                <h4>Address:</h4><h5>{this.props.input.projectAddress.projectAddress}</h5>
                <h4>City:</h4><h5>{this.props.input.projectAddress.projectCity}</h5>
                <h4>State:</h4><h5>{this.props.input.projectAddress.projectState}</h5>
                <h4>Zipcode:</h4><h5>{this.props.input.projectAddress.projectZipcode}</h5>
            </div>
        );
        
    return (
        <form>
            <h3>{result.title}</h3>
            
            
            <div>
                <h4>{result.subtitle}</h4>
                <div className="matchContainer">
                    { matches }
                </div>
            </div>
        

            { result.additionalContent }

            <ButtonGroup>
                <Button 
                    className="btn clearanceButton"
                    onClick={
                        ()=>{
                          this.props.handleSubmit(this.props.result);
                        }
                    }>
                    {result.buttonLabel}
                </Button>
                
                <LinkContainer to="/productChoice">
                    <Button className="btn secondary"> Return to Product Selection</Button>
                </LinkContainer>
            </ButtonGroup>

        </form>
    );
  }
}

export default connect((store)=>{
  return({
    submission:store.app.submission
  });
})(Result);