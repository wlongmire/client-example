import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import HomeView from 'components/Home';

function Home(props, context) {
  const {
    content
  } = context;
  return (
    <div className='home'>
      <Helmet title={content.title} />
      <HomeView />
    </div>
  );
}

Home.contextTypes = {
  config: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired
};

export default Home;
