import React, { Component, PropTypes } from 'react';

import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';

function Knockout(props) {
    // const result = (props.result.success)?{
    //     title: "This Submission Passed Clearance!",
    //     subtitle: "Noone appears to have submitted this insured for review. Now we can enter additional quote information.",
    //     buttonLabel: "Fill out Remaining Information"
    // }:{
    //     title: "This Submission Did Not Pass Clearance.",
    //     subtitle: "The following Submmissions appear to match this one.",
    //     buttonLabel: "Reenter Primary Insured Information"
    // }

    return (
    <form>
        <h3>We are reviewing your Submission.</h3>
        
        <ButtonGroup>
            <LinkContainer to="/submissions">
                <Button className="btn"> Return to Submissions</Button>
            </LinkContainer>
        </ButtonGroup>

    </form>
    );
}

export default connect()(Knockout)