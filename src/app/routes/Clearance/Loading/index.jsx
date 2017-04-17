import React, { Component, PropTypes } from 'react'

import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';

import getClearance from 'app/utils/getClearance';

class Loading extends Component {
//does clearance check and shows loading screen
    constructor(props) {
        super(props)
        this.state = {};
    }

    componentDidMount() {
        getClearance({
            name:this.props.input.primaryInsuredName,
            addresses:[
                this.props.input.projectAddress,
                this.props.input.insuredAddress
            ]
        }).then((resp)=> {
            this.props.handleSubmit(false, {success:(resp.matches.length === 0), matches:resp.matches});
        })
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