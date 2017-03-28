import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import SubmissionView from './View';

function Submissions(props, context) {
  const {
    content
  } = context;
  return (
    <div className='submissions'>
      <Helmet title={content.title} />
      <SubmissionView />
    </div>
  );
}

Submissions.contextTypes = {
  config: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired
};

export default Submissions;
