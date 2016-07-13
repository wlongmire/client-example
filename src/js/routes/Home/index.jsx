import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

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

  contextTypes: {
    content: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      content: this.context.content.Home
    };
  }
});

export default Home;
