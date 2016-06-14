import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

const Home = React.createClass({
  render() {
    return (
      <div className='home'>
        <Helmet title='Home' />
        This is the home component.
      </div>
    );
  }

});

export default Home;
