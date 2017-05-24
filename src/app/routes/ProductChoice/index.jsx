import React, { Component } from 'react'

import {connect} from 'react-redux'
import { push } from 'react-router-redux'

import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'

import ratingProducts from 'config/RatingProducts'
import constants from 'app/constants/app'

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
          type: constants.CHANGE_SUBMISSION,
          submission: { type, status: constants.SUBMISSION_STATUS.CLEARANCE }
        })

        mx.customEvent(
          "submission",
          "create",
          { Type: type }
        );

        props.dispatch(push('/clearance'))
        {/*props.dispatch(push('/form'))*/}

      }}>

      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  )
}

class ProductChoice extends Component {
  componentDidMount() {
    const { CHANGE_SUBMISSION_STATUS, CLEAR_SUBMISSION, SUBMISSION_STATUS } = constants;

    this.props.dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.SELECTION })
    this.props.dispatch({ type: CLEAR_SUBMISSION })
  }
  render() {
    const generateItems = ()=>{
      return Object.keys(ratingProducts).map((productType,idx)=> {
        return (<ProductChoiceItem
          key={idx} 
          type={productType} 
          name={ratingProducts[productType].name} 
          description={ratingProducts[productType].description}
          dispatch={this.props.dispatch}
          />
        )
      })
    }
    return (
      <div className='page productChoice'>
          <h3>Select Your Insurance Product.</h3>
          <h4></h4>     
          <div className="selectionCards">
            { generateItems() }
          </div>
          <LinkContainer to="/submissions">
              <Button className="btn">Return to Submissions</Button>
            </LinkContainer>
      </div>
    );
  }
}

export default connect()(ProductChoice)