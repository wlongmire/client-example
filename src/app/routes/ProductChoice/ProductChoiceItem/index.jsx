import React, { Component } from 'react'
import { connect } from 'react-redux'

import { push } from 'react-router-redux'

import {
  CHANGE_SUBMISSION,
  SUBMISSION_STATUS
} from 'app/constants/submission'

import mx from 'app/utils/MixpanelInterface'

function ProductChoiceItem(props) {
  const {
    type,
    name,
    description,
    dispatch
  } = props

  return (
    <div
      data-type={type}
      className="selectionCard"
      onClick={() => {
        props.dispatch({
          type: CHANGE_SUBMISSION,
          submission: { type, status: SUBMISSION_STATUS.CLEARANCE }
        })

        mx.customEvent(
          'submission',
          'create',
          { Type: type }
        )

        props.dispatch(push("/clearance"))
        {/*props.dispatch(push("/form"))*/}
      }}
    >
      <h1>{name}</h1>
      <p>{description}</p>
    </div>)
}

export default connect()(ProductChoiceItem)