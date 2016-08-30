import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import SignInForm from 'components/SignInForm';

function SignIn(props, context) {
  const {
    content
  } = context;
  return (
    <div className='signin'>
      <Helmet title={content.title} />
      <SignInForm />
    </div>
  );
}

SignIn.contextTypes = {
  config: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired
};

export default SignIn;
