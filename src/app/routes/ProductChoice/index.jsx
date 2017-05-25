import React, { Component } from 'react'
import { connect } from 'react-redux'

import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'

import ProductChoiceItem from './ProductChoiceItem'

import ratingProducts from 'config/RatingProducts'
import constants from 'app/constants/app'

import mx from 'app/utils/MixpanelInterface'

class ProductChoice extends Component {
  componentDidMount() {
    const { CHANGE_SUBMISSION_STATUS, CLEAR_SUBMISSION, SUBMISSION_STATUS } = constants

    this.props.dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.SELECTION })
    this.props.dispatch({ type: CLEAR_SUBMISSION })
  }

  render() {
    const generateItems = () => {
      return Object.keys(ratingProducts).map((productType, idx) => {
        return (<ProductChoiceItem
          key={idx}
          type={productType}
          name={ratingProducts[productType].name}
          description={ratingProducts[productType].description}
          dispatch={this.props.dispatch}
        />)
      })
    }
    return (
      <div className="page productChoice">
        <h3>Select Your Insurance Product.</h3>
        <div className="selectionCards">
          { generateItems() }
        </div>
        <LinkContainer to="/submissions">
          <Button className="btn">Return to Submissions</Button>
        </LinkContainer>
      </div>
    )
  }
}

export default connect()(ProductChoice)