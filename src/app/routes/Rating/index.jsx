import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import RatingForm from 'components/RatingForm';

function Rating(props, context) {
  const {
    content
  } = context;
  return (
    <div className='submissions'>
      <Helmet title={content.title} />
      <RatingForm />
    </div>
  );
}

Rating.contextTypes = {
  config: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired
};

export default Rating;