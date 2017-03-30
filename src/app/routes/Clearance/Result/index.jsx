import React, { Component, PropTypes } from 'react';

import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';

function Result(props) {

    const result = (props.result.success)?{
        title: "This Submission Passed Clearance!",
        subtitle: "Noone appears to have submitted this insured for review. Now we can enter additional quote information.",
        buttonLabel: "Fill out Remaining Information"
    }:{
        title: "This Submission Did Not Pass Clearance.",
        subtitle: "The following Submmissions appear to match this one.",
        buttonLabel: "Reenter Primary Insured Information"
    }

    return (
    <form>
        <h3>{result.title}</h3>
        <h4>{result.subTitle}</h4>

        
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