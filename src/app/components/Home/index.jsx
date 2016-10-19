import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import * as actions from './actions';
import { formatDollars } from '../../utils/utilities';

class Home extends Component{
  componentWillMount(){
    this.props.getSubmissions(this.props.user['_brokerId']);
  }

  goToPage(submission){
    this.props.editSubmission(submission);
  }


  render(){
    if(!this.props.submissions.data){
      return (<div>Loading submissions...</div>);
    }
    let submissions = this.props.submissions.data.submissions;

    submissions = submissions.sort(function(a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
    
    const list = submissions.map((submission, key)=>{
      return (
        <tr key={key}>
          <td>{submission.primaryNamedInsured}</td>
          <td>{formatDollars(submission.quotedPremium)}</td>
          <td>{formatDollars(submission.totalCost)}</td>
          <td>{formatDollars(submission.totalPremium)}</td>
          <td>{Moment(submission.createdAt).format('MMMM Do YYYY')}</td>
          <td onClick={()=> this.goToPage(submission)} className="link">Edit</td>
        </tr>
      );
    });
    return (
      <div>
      <h3>Your submissions</h3>
      <table className="u-full-width">
          <thead>
            <tr>
              <th>Primary Named Insured</th>
              <th>Quoted Premium</th>
              <th>Total Cost</th>
              <th>Total Premium</th>
              <th>Date Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user.state.user,
    submissions: state.submissions
  };
}

export default connect(mapStateToProps, actions)(Home);
