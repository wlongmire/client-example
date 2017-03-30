import React, { Component, PropTypes } from 'react'

import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';

class Input extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        const input = {
            name:"Warren Longmire",
            address:"2923 N 27th Street Philadelphia, PA 19132"
        }

        this.props.handleSubmit(input)
    }

    render() {
        return (
            <form>
                <h3>First Let's Check for Clearance</h3>
                <h4>Enter the following information to clear against previous submissions</h4>

                <ButtonGroup>
                    <Button 
                        className="btn secondary" 
                        onClick={ this.handleSubmit }>
                        Check For Clearance
                    </Button>

                    <LinkContainer to="/productChoice">
                        <Button className="btn"> Return to Product Selection</Button>
                    </LinkContainer>
                </ButtonGroup>

            </form>
            );
    }
}

export default connect()(Input)