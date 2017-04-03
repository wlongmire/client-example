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

        console.log(this.props.input);

        // setTimeout(()=>{
        //     this.props.handleSubmit(error, result);
        // }, 2000);
    }

    render() {
        return (
            <form>
                <h3>Checking Prior Submissions</h3>
                <h4>Please Wait while we scan for matches.</h4>

                <div className="loadingImg">
                    <img src="https://ownersedgeassets.herokuapp.com/images/main/ajax-loader.gif"/>
                </div>

                <ButtonGroup>
                    <Button onClick={ this.props.handleCancel } className="btn">
                        Return to Clearance Form
                    </Button>
                </ButtonGroup>

            </form>
        );
    }
}

export default connect()(Loading)