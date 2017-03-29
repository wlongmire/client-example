import React, { Component, PropTypes } from 'react';
import {connect}  from 'react-redux';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import SubmissionView from './View';
import constants from 'app/constants/app';

function Submissions(props, context) {
  const {
    content
  } = context;

  const { CHANGE_SUBMISSION_STATUS, CLEAR_SUBMISSION, SUBMISSION_STATUS } = constants;

  props.dispatch({type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.NONE})
  props.dispatch({type: CLEAR_SUBMISSION})

  return (
    <div className='submissions'>
      <Helmet title={content.title} />
      <SubmissionView dispatch={props.dispatch}/>
    </div>
  );
}

Submissions.contextTypes = {
  config: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired
};

export default connect()(Submissions);
