'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
  render() {
    return (
      <div className='app'>
        { this.props.children }
      </div>
    );
  }

});

export default App;
