import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'
import Helmet from 'react-helmet'

import { push } from 'react-router-redux'

import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap';

import ratingProducts from 'config/RatingProducts'
import constants from 'app/constants/app'

function ProductChoiceItem(props) {
  const {
    type,
    name,
    description,
    dispatch
  } = props;

  return (
      <div 
        data-type={type} 
        className="selectionCard"
        onClick={()=>{
          props.dispatch({ type: constants.CHANGE_SUBMISSION, submission: { type, status:constants.SUBMISSION_STATUS.CLEARANCE } });
          props.dispatch(push("/clearance"));
        }}>
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
  )
}

function ProductChoice(props) {
  const { CHANGE_SUBMISSION_STATUS, CLEAR_SUBMISSION, SUBMISSION_STATUS } = constants;

  const generateItems = ()=>{
    return Object.keys(ratingProducts).map((productType,idx)=>{  
      return (<ProductChoiceItem 
        key={idx} type={productType} 
        name={ratingProducts[productType].name} 
        description={ratingProducts[productType].description}
        dispatch={props.dispatch}
        />
      )
    })
  }

  props.dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.SELECTION })
  props.dispatch({ type: CLEAR_SUBMISSION })

  return (
    <div className='page productChoice'>
        <h3>Select Your Insurance Product</h3>

        <div className="selectionCards">
          
          {
            generateItems()
          }
        
        </div>

         <LinkContainer to="/submissions">
            <Button className="btn">Return to Submissions</Button>
          </LinkContainer>
    </div>
  );
}

export default connect()(ProductChoice);