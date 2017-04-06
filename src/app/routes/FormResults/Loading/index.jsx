import React, { Component, PropTypes } from 'react'

import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap'

import saveSubmission from 'app/utils/saveSubmission'
import sendEmail from 'app/utils/sendEmail'

import config from 'config';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const rating = { instantQuote:false };
        const error = false;
        
        const brokerEmail = "warrenlongmire@gmail.com"

        // quotedArgo
        // quotedBroker

        // nonQuoteArgo
        // nonQuoteBroker

        

        sendEmail(brokerEmail, "nonQuotedBroker", "58e64bbfdb7bda6f5eae60ae").then((resp)=>{
            console.log(resp)
        });
    }

    render() {
      return (
          <form>
              <h3>Calculating Quote</h3>
              <h4>Please Wait while we calculate.</h4>

              <div className="loadingImg">
                  <img src="https://ownersedgeassets.herokuapp.com/images/main/ajax-loader.gif"/>
              </div>


              <ButtonGroup>
                  <LinkContainer to="/submissions">
                      <Button className="btn"> Return to Submissions</Button>
                  </LinkContainer>
              </ButtonGroup>

          </form>
      );
    }
}

export default connect()(Loading);