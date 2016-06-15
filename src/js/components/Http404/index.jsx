import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

const Http404 = React.createClass({
  render() {
    return (
      <div className='http-404-not-found'>
        <Helmet title='404 Not Found' />
        HTTP 404 Not Found
      </div>
    );
  }

});

export default Http404;
