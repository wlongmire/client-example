import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import SignInFormView from './View'

function SignIn(props, context) {
  const { content } = context
  return (
    <div className="signin">
      <h1>Test</h1>
      <Helmet title={content.title} />
      <SignInFormView />
    </div>
  )
}

SignIn.contextTypes = {
  config: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired
}

export default SignIn