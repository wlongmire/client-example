import React, { Component, PropTypes } from 'react'

import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap'

import saveSubmission from 'app/utils/saveSubmission'
import sendEmail from 'app/utils/sendEmail'

import config from 'config';

import getRating from 'app/utils/getRating';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {submission} = this.props;
        let typeMap = {
            "oi":[submission], 
            "ocp":[submission, Object.assign({}, submission, {type:"oi"})]
        }

        const ratingPromises = typeMap[submission.type];

        Promise.all(ratingPromises.map((s)=>(
            getRating(s)
        ))).then((resp)=>{

            let ratings = {}
            ratingPromises.map((ratingSubmission, idx)=>{
                ratings[ratingSubmission.type] = resp[idx].rating
            })

            const submissionData = this.props.submission;
            submissionData.rating = ratings

            saveSubmission(submissionData).then((resp)=>{
                if (resp.success) {
                    const {submissionId} = resp
                    const mainRating = ratings[submission.type]
                    const { instantQuote } = mainRating
                    
                    const emailPromises = [
                        sendEmail("warrenlongmire999@gmail.com", (instantQuote)?"quotedArgo":"nonQuotedArgo", submissionId),
                        sendEmail("warren@eager.to", (instantQuote)?"quotedArgo":"nonQuotedArgo", submissionId),
                        sendEmail("warrenlongmire@gmail.com", (instantQuote)?"quotedBroker":"nonQuotedBroker", submissionId)
                    ]

                    Promise.all(emailPromises).then((resp)=>{
                        console.log(resp);
                        this.props.handleEmailStatus({success:true})
                    })
                } else {
                    alert("Submission saveSave not successful");
                }

            });
        
            this.props.handleSubmit(!resp[0].success, ratings);
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