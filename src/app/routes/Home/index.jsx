import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import RatingForm from 'components/RatingForm';

function Home(props, context) {
  const {
    content
  } = context;
  return (
    <div className='home'>
      <Helmet title={content.title} />
      <RatingForm />
    </div>
  );
}

Home.contextTypes = {
  config: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired
};

export default Home;
