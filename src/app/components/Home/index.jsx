import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';

class Home extends Component{
  componentWillMount(){
    this.props.getSubmissions(this.props.user['_brokerId']);
  }


  render(){
    if(!this.props.submissions.data){
      return (<div>Loading submissions...</div>);
    }
    const submissions = this.props.submissions.data;
    const list = submissions.map((submission, key)=>{
      return <div key={key}>{submission.confirmationNumber}</div>;
    });
    return (
      <div>{list}</div>
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
