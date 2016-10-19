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
    const submissions = this.props.submissions.data.submissions;
    const list = submissions.map((submission, key)=>{
      return (
        <tr key={key}>
          <td onClick={()=> this.goToPage(submission)} className="link">{submission.confirmationNumber}</td>
          <td>{formatDollars(submission.quotedPremium)}</td>
          <td>{formatDollars(submission.totalCost)}</td>
          <td>{formatDollars(submission.totalPremium)}</td>
          <td>{Moment(submission.createdAt).format('MMMM Do YYYY')}</td>
        </tr>
      );
    });
    return (
      <div>
      <h3>Your submissions</h3>
      <table className="u-full-width">
          <thead>
            <tr>
              <th>Confirmation Number</th>
              <th>Quoted Premium</th>
              <th>Total Cost</th>
              <th>Total Premium</th>
              <th>Date Created</th>
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
