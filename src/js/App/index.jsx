import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import config from '../config';

const App = React.createClass({
  render() {
    let baseMeta = [
      {
        'name': 'description',
        'content': config.description
      },
      {
        'property': 'og:type',
        'content': 'site'
      }
    ];
    let titleTemplate = config.title + ' | %s';
    return (
      <div className='app'>
        <Helmet
          titleTemplate={ titleTemplate }
          meta={ baseMeta }
        />
        { this.props.children }
      </div>
    );
  }

});

export default App;
