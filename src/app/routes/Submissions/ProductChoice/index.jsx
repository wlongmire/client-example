import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { LinkContainer } from 'react-router-bootstrap'
import { Button, Col, Row } from 'react-bootstrap'

import ProductChoiceItem from './ProductChoiceItem'

import ratingProducts from '../../../../config/RatingProducts'
import {
  CHANGE_SUBMISSION_STATUS,
  CLEAR_SUBMISSION,
  SUBMISSION_STATUS
} from 'app/constants/submission'

import mx from 'app/utils/MixpanelInterface'

export class ProductChoice extends Component {
  componentDidMount() {
    this.props.dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.SELECTION })
    this.props.dispatch({ type: CLEAR_SUBMISSION })
  }

  render() {
    const generateItems = () => {
      return Object.keys(ratingProducts).map((productType, idx) => {
        return (
          <Col lg={5} md={6} sm={6} xs={12}>
          <ProductChoiceItemC
          key={idx}
          type={productType}
          name={ratingProducts[productType].name}
          subtitle={ratingProducts[productType].subtitle}
          description={ratingProducts[productType].description}
          broker={this.props.user.brokerId}
        /></Col>)
      })
    }
    return (
      <div className="productChoice routeContainer">
      <Col lg={8} md={10} sm={12} xs={12}>
        <h3>Get a quote</h3>
        <Row><div className="selectionCards">
          { generateItems() }
        </div>
        </Row>
        </Col>
      </div>
    )
  }
}

ProductChoice.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object
}

export default connect((store) => {
  return ({
    user: store.user
  })
})(ProductChoice)