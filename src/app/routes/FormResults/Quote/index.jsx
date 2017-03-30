import React, { Component, PropTypes } from 'react'

import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';

class Quote extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <form>
                <h3>Here is your Instant Quote!</h3>
                
                <ButtonGroup>
                    <LinkContainer to="/submissions">
                        <Button className="btn"> Return to Submissions</Button>
                    </LinkContainer>
                </ButtonGroup>

            </form>
        );
    }
}

export default connect()(Quote)