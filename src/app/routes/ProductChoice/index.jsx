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

function ProductChoice(props, context) {
  const {
    content
  } = context;

  
  return (
    <div className='productChoice '>
        <h3>Select The Insurance Product</h3>

        <div className="selectionCards">
          <div data-type='oi' className="selectionCard">
            <h1>Owner's Interest</h1>
            <p>Mi eu a mattis parturient vel phasellus parturient parturient vestibulum tellus fusce ante nisl dictum facilisis nam ridiculus ornare purus et. Montes fermentum duis quisque vivamus iaculis tempor et ad nunc mus nibh vulputate libero a tellus laoreet condimentum.</p>
          </div>

          <div data-type='ocp' className="selectionCard">
            <h1>Owner Contractor's Product</h1>
            <p>Mi eu a mattis parturient vel phasellus parturient parturient vestibulum tellus fusce ante nisl dictum facilisis nam ridiculus ornare purus et. Montes fermentum duis quisque vivamus iaculis tempor et ad nunc mus nibh vulputate libero a tellus laoreet condimentum.</p>
          </div>
          
        </div>

         <LinkContainer to="/submissions">
            <Button className="backButton"> Return to Submissions</Button>
          </LinkContainer>
    </div>
  );
}

export default ProductChoice;