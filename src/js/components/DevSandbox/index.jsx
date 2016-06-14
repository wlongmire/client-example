import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

const DevSandbox = React.createClass({
  render() {
    return (
      <div className='dev-sandbox'>
        <Helmet title='DevSandbox' />
        This is the dev-sandbox component.
      </div>
    );
  }

});

export default DevSandbox;
