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
        const result = { success:true, matches:[] };
        const error = false;
        
        getClearance({
            name:this.props.input.nameInsuredName, 
            address:this.props.input.address.namedInsuredAddress, 
            state:this.props.input.address.namedInsuredState,
            city:this.props.input.address.namedInsuredCity,
            zipcode:this.props.input.address.namedInsuredZipcode
        }).then((resp)=> {
            this.props.handleSubmit(error, result);
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