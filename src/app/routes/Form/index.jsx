import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'

import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap';

import constants from 'app/constants/app'

function Form(props) {
  const { CHANGE_SUBMISSION_STATUS, SUBMISSION_STATUS } = constants;

  props.dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.CREATING })

  return (
    <div className='page productChoice'>
        <h3>Fill Out the rest of the details</h3>

         <LinkContainer to="/submissions">
            <Button className="btn">Return to Submissions</Button>
          </LinkContainer>
    </div>
  );
}

export default connect()(Form);