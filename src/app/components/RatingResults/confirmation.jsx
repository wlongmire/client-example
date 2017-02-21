import React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import Oi from './oi';
import Ocp from './ocp';

import styles from './styles';

import * as actions from '../RatingForm/decorators/reduxForm/handleSubmit';

function ConfirmationView(props) {

  const submission = props.location.state.payload;
  const ConfirmationView = submission.type === 'ocp'? Ocp : Oi;

  return (
      <ConfirmationView
        submission={submission}
        submit={props.handleSubmit}
      />
  );
}

export default connect(null, actions)(ConfirmationView);
