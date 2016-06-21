import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import content from 'content';

const DevSandbox = React.createClass({
  render() {
    return (
      <div className='dev-sandbox'>
        <Helmet title={ this.state.content.title } />
        <p>
          { this.state.content.p }
        </p>
      </div>
    );
  },

  getInitialState () {
    return {
      content: content.DevSandbox
    };
  }
});

export default DevSandbox;
