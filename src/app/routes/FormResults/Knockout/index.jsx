import React, { Component, PropTypes } from 'react';

import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';

function Knockout(props) {
    return (
    <form>
        <h3>We are reviewing your Submission.</h3>
        
        <h4>Based on your answers, we couldn't provide you with an instant quote.</h4>
        <h4>One of our underwriters will be in contact with you to finalize your coverage options and assist you with purchase.</h4>

        <ButtonGroup>
            <LinkContainer to="/submissions">
                <Button className="btn"> Return to Submissions</Button>
            </LinkContainer>
        </ButtonGroup>

    </form>
    );
}

export default connect()(Knockout)