import React from 'react';

import Helmet from 'react-helmet';
import querystring from 'querystring';

import config from 'config';
import Header from 'components/Header';

let query = querystring.parse(window.location.search.slice(1));

let content = require('content');

const App = React.createClass({
  render() {
    let baseMeta = [
      {
        'name': 'description',
        'content': content.description
      },
      {
        'property': 'og:type',
        'content': 'site'
      }
    ];

    let titleTemplate = content.title + ' | %s';

    return (
      <div className='app'>
        <Helmet
          titleTemplate={ titleTemplate }
          meta={ baseMeta }
        />

        <Header />

        { this.props.children }
      </div>
    );
  },

  childContextTypes: {
    config: React.PropTypes.object.isRequired,
    content: React.PropTypes.object.isRequired
  },

  getChildContext () {
    return {
      config: config,
      content: content
    };
  }

});

export default App;
