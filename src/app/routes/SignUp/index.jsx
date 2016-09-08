import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import SignUpForm from 'components/SignUpForm';

function SignUp(props, context) {
  const {
    content
  } = context;
  return (
    <div className='signup'>
      <Helmet title={content.title} />
      <SignUpForm />
    </div>
  );
}

SignUp.contextTypes = {
  config: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired
};

export default SignUp;