import React, { PropTypes } from 'react'

function SignupHeader(props) {
  return (
    <div>
      <h4>{props.header1}</h4>
      <h1>{props.header2}</h1>
    </div>
  )
}

SignupHeader.propTypes = {
  header1: PropTypes.string.isRequired,
  header2: PropTypes.string.isRequired,
}

export default SignupHeader