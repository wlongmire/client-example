import React, { Component, PropTypes } from 'react'

import { LinkContainer } from 'react-router-bootstrap'
import mx from 'app/utils/MixpanelInterface'
import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'
// import ToggleDisplay from 'components/shared/ToggleDisplay'
import config from 'config'

export class Result extends Component {
  render() {
    const failClearaceMessage = (config.clearanceFailFlag === 'true') ?
    (<div className="matchMessage">
      <h3>Sent to an underwriter for review</h3>
      <br />
      <h5>
        If we find that this was declined in error, we will contact you.  Please email Jessica Buelow (<a href="mailto:jbuelow@colonyspecialty.com">jbuelow@colonyspecialty.com</a>) with any questions.
      </h5>
    </div>) :
    (<div className="matchMessage">
      <h3>Blocked in Error?</h3>
      <h5>
        If we have blocked clearance in error, please message us through the
          <img src={`${config.assetsURL}/images/chatIcon.png`} />
          icon below or contact Jessica Buelow (<a href="mailto:jbuelow@colonyspecialty.com">jbuelow@colonyspecialty.com</a>).
      </h5>
    </div>)

    const result = (this.props.result.success) ? {
      title: "This Submission Has Passed Clearance!",
      subtitle: "You are the first to submit this insured for review. Now we can enter additional pricing information.",
      additionalContent: "",
      buttonLabel: "Fill out Remaining Information"
    } : {
      title: "This Submission Did Not Pass Clearance.",
      subtitle: "Your business as listed below matches a previously processed submission.",
      additionalContent: <div className="additionalContent">
        {failClearaceMessage}
      </div>,
      buttonLabel: "Reenter Clearance Information"
    }


    const showMatchResults = false
  // mixpanel events
    if (this.props.result.success) {
      mx.customEvent(
        "submission",
        "passClearance",
        {
          Type: this.props.submission.type
        }
          );
    } else {
      mx.customEvent(
          "submission",
          "failClearance", { 
            Type: this.props.submission.type,
            Matches: this.props.result.matches
          })
    }

    const matches = (
      <div className="match">
        <h4>First Named Insured:</h4><h5>{this.props.input.primaryInsuredName}</h5>
        <h4>Project Address:</h4><h5>
          {this.props.input.projectAddress.projectAddress}
          <br />
          {this.props.input.projectAddress.projectCity} {this.props.input.projectAddress.projectState} {this.props.input.projectAddress.projectZipcode}
        </h5>
      </div>)

    return (
        <form>
            <h3>{result.title}</h3>
            
            
            <div>
                <h4>{result.subtitle}</h4>
                <div className="matchContainer">
                  { result.additionalContent }
                  { matches }
                    
                </div>
            </div>

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
    )
  }
}

Result.propTypes = {
  input: PropTypes.object.isRequired,
  submission: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default connect((store) => {
  return ({
    submission: store.app.submission,
    user: store.user
  })
})(Result)