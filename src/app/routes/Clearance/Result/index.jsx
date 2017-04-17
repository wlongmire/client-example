import React, { Component, PropTypes } from 'react';

import { LinkContainer } from 'react-router-bootstrap';

import { connect } from 'react-redux';
import { ButtonGroup, Button, Panel } from 'react-bootstrap';

function Result(props) {
    const result = (props.result.success)?{
        title: "This Submission Passed Clearance!",
        subtitle: "You are the first to submit this insured for review. Now we can enter additional quote information.",
        buttonLabel: "Fill out Remaining Information"
    }:{
        title: "This Submission Did Not Pass Clearance.",
        subtitle: "The following submmission(s) appear to match:",
        buttonLabel: "Reenter Clearance Information"
    }

    const matches = (!props.result.success)?
        (props.result.matches.map((m, idx)=> (
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
                <h4>Name:</h4><h5>{props.input.primaryInsuredName}</h5>
                <h4>Address:</h4><h5>{props.input.projectAddress.projectAddress}</h5>
                <h4>City:</h4><h5>{props.input.projectAddress.projectCity}</h5>
                <h4>State:</h4><h5>{props.input.projectAddress.projectState}</h5>
                <h4>Zipcode:</h4><h5>{props.input.projectAddress.projectZipcode}</h5>
            </div>
        )
        
    return (
        <form>
            <h3>{result.title}</h3>
            <h4>{result.subtitle}</h4>
            
            <div className="matchContainer">
                { matches }
            </div>

            <ButtonGroup>
                <Button 
                    className="btn secondary" 
                    onClick={
                        ()=>{
                            props.handleSubmit(props.result)
                        }
                    }>
                    {result.buttonLabel}
                </Button>
                
                <LinkContainer to="/productChoice">
                    <Button className="btn"> Return to Product Selection</Button>
                </LinkContainer>
            </ButtonGroup>

        </form>
    );
}

export default connect()(Result)