import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import content from 'content';

const Home = React.createClass({
  render() {
    return (
      <div className='home'>
        <Helmet title={ this.state.content.title } />
        <p>
          { this.state.content.p }
        </p>
      </div>
    );
  },

  getInitialState () {
    return {
      content: content.Home
    };
  }
});

export default Home;
