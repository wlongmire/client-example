import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { push } from 'react-router-redux'

import { Row, Col, Button } from 'react-bootstrap'

import {isNullOrEmpty} from '../../../../utils/utilities'
import config from 'config'

import {
  CHANGE_SUBMISSION,
  SUBMISSION_STATUS
} from 'app/constants/submission'

import mx from 'app/utils/MixpanelInterface'

export function ProductChoiceItem(props) {
  const {
    type,
    name,
    description,
    broker,
    subtitle
  } = props

  return (
    <div data-type={type}>
        <div className="productContainer">
          <div className="textContainer">
          <h4>{name}</h4>
          <span>{subtitle}&nbsp;</span>
          <div>
          <Button onClick={() => {
            props.dispatch({
              type: CHANGE_SUBMISSION,
              payload: {
                submission: { type, status: SUBMISSION_STATUS.CLEARANCE }
              }
            })

            mx.customEvent(
              'submission',
              'create',
              {
                Type: type
              }
            )

            const route = (broker === config.underwriterBrokerId) ? '/clearanceunderwriter' : '/clearance'

            props.dispatch(push(route))
          }}
          >Start Submission</Button>
          </div>
        </div>
        </div>
    </div>)
}
ProductChoiceItem.propTypes = {
  dispatch: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  broker: PropTypes.string,
  subtitle: PropTypes.string
}


export default connect()(ProductChoiceItem)