import React, { Component, PropTypes } from 'react';
import {connect}  from 'react-redux';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import * as actions from 'src/app/reducers/SubmissionView/actions';
import SubmissionView from './View';
import constants from 'app/constants/app';
import Moment from 'moment';

class Submissions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.clearSubmissionStatus();
    this.props.getSubmissions(this.props.user['_brokerId']);
  }

  render() {
    return (
      <div className='submissions'>
        {this.props.submissions.data &&
          <SubmissionView 
            sumbissionData={this.props.submissions.data}
            dispatch={this.props.dispatch}/>}
      </div>
    );
  }
}

function mapStateToProps(state){
  console.log('STATE', state.submissions);
  return {
    user: state.user,
    submissions: state.submissions
  };
}

export default connect(mapStateToProps, actions)(Submissions);
