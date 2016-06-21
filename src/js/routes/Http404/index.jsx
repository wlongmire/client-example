import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import content from 'content';

const Http404 = React.createClass({
  render() {
    return (
      <div className='http-404-not-found'>
        <Helmet title={ this.state.content.title } />
        <p>
          { this.state.content.p }
        </p>
      </div>
    );
  },

  getInitialState () {
    return {
      content: content.Http404
    };
  }
});

export default Http404;
