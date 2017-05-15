import React, { Component } from 'react';

import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';

import config from 'config';

function Knockout(props) {
    const emailStatusMap = {
        "LOADING":
            <div className="emailStatus">
                <img src="https://ownersedgeassets.herokuapp.com/images/main/ajax-loader.gif"/>
                <p>Emails Currently Being Processed</p><span>From there, all forms needed will be sent to argo and your inbox.</span>
            </div>,
        "ERROR":
            <div className="emailStatus error">
                <p>There appears to be something wrong.</p><span>Please contact us to complete this transaction.</span>
            </div>,
        "SUCCESS":
            <div className="emailStatus success">
                <img src="https://ownersedgeassets.herokuapp.com/images/main/thumbs-up.png"/>
                <p>Your submission forms have been successfully processed.</p><span>Please check your your inbox. Thank you for using Argo Limited.</span>
            </div>
    }
    
    const { reason } = props.ratings[props.submission.type];
    const reasonDisplay = reason.map((r, idx)=>(
        <div key={idx} className="reason"> {r}</div>
    ))

    const underwriters = config.underwriters.map((uw, idx)=>(
        <li key={idx}>{uw.name} – {uw.position} – {uw.location} - {uw.phone}</li>
    ));


    return (
    <form>
        <h3>We are reviewing your Submission.</h3>
        
        <div className="content">
            <p>Based on your answers, we couldn't provide you with a instant pricing indication for the following reasons:</p>
            
            <div className="reasons">
                { reasonDisplay }
            </div>

            <p>One of our underwriters will be in contact with you to finalize your coverage options and assist you with purchase.</p>

            <ul>
                {underwriters}
            </ul>
        </div>
        
        { emailStatusMap[props.emailStatus] }
        
        <ButtonGroup>
            <LinkContainer to="/submissions">
                <Button className="btn"> Return to Submissions</Button>
            </LinkContainer>
        </ButtonGroup>

    </form>
    );
}

export default connect()(Knockout)