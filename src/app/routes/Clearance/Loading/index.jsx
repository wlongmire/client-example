import React, { Component, PropTypes } from 'react'

import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';

class Loading extends Component {
//does clearance check and shows loading screen
    constructor(props) {
        super(props)
        this.state = {};
    }

    componentDidMount() {
        const result = { success:true, matches:[] };
        const error = false;

        setTimeout(()=>{
            this.props.handleSubmit(error, result);
        }, 2000);
    }

    render() {
        return (
            <form>
                <h3>Checking Prior Submissions</h3>
                <h4>Please Wait while we scan for matches.</h4>

                <img 
                style={{"display":"block", "padding":"1em"}} 
                src="https://ownersedgeassets.herokuapp.com/images/main/ajax-loader.gif"/>

                <ButtonGroup>
                    <LinkContainer to="/productChoice">
                        <Button className="btn"> Return to Product Selection</Button>
                    </LinkContainer>
                </ButtonGroup>

            </form>
        );
    }
}

export default connect()(Loading)