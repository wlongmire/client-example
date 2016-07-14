import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

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

  contextTypes: {
    config: React.PropTypes.object.isRequired,
    content: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      content: this.context.content.Http404
    };
  }
});

export default Http404;
