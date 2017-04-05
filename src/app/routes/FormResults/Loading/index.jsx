import React, { Component, PropTypes } from 'react'

import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap'

import saveSubmission from 'app/utils/saveSubmission'

class Loading extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      const rating = { instantQuote:false };
      const error = false;
        
      const submissionData = this.props.submission;

      // ATTACH OI and OCP data here so it gets saved with submission
      // submissionData.rating = {
      //   oi: {
      //     lmao: '1234'
      //   },
      //   ocp: {
      //     ocpLMAO: '124333'
      //   }
      // };

      saveSubmission(submissionData);

      setTimeout(()=>{
        this.props.handleSubmit(error, rating);
      }, 2000);
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