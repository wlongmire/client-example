import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Helmet from 'react-helmet'

import {
  LinkContainer
} from 'react-router-bootstrap'

import {
  Button
} from 'react-bootstrap';

import ratingProducts from 'config/RatingProducts'

function ProductChoiceItem(props) {
  const {
    type,
    name,
    description
  } = props;

  return (
      <div data-type={type} className="selectionCard">
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
  )
}

function ProductChoice(props) {
  const generateItems = ()=>{
    return Object.keys(ratingProducts).map((productType,idx)=>{  
      return (<ProductChoiceItem 
        key={idx} type={productType} 
        name={ratingProducts[productType].name} 
        description={ratingProducts[productType].description}
        />
      )
    })
  }

  return (
    <div className='productChoice '>
        <h3>Select The Insurance Product</h3>

        <div className="selectionCards">
          
          {
            generateItems()
          }
        
        </div>

         <LinkContainer to="/submissions">
            <Button className="backButton"> Return to Submissions</Button>
          </LinkContainer>
    </div>
  );
}

export default ProductChoice;