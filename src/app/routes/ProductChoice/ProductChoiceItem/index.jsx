import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { push } from 'react-router-redux'

import {
  CHANGE_SUBMISSION,
  SUBMISSION_STATUS
} from 'app/constants/submission'

import { submissionCreate } from 'app/actions/submissionActions'

export function ProductChoiceItem(props) {
  const {
    type,
    name,
    description,
    brokerId
  } = props

  return (
    <div
      data-type={type}
      className="selectionCard"
      onClick={() => {
        props.dispatch({
          type: CHANGE_SUBMISSION,
          payload: {
            submission: { type, status: SUBMISSION_STATUS.CLEARANCE }
          }
        })

        props.dispatch(submissionCreate({ Type: type }))       

        props.dispatch(push('/clearance'))
        /* props.dispatch(push("/form")) */
      }}
    >
      <h1>{name}</h1>
      <p>{description}</p>
    </div>)
}
ProductChoiceItem.propTypes = {
  dispatch: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  brokerId: PropTypes.string
}


export default connect()(ProductChoiceItem)