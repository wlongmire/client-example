import React from 'react';
import Helmet from 'react-helmet';
import querystring from 'querystring';
// import ga from 'react-ga';

import config from 'config';
import Logo from 'components/Logo';

let query = querystring.parse(window.location.search.slice(1));

// For AB Testing Content // In progress here; see Airflows

if (query.t) {
  testString = query.t;

  switch (query.t) {
    case 'aa1001':
      content = require('content/_test.aa1001');
    break;

    default:
      content = require('content');
  }
} else {
  testString = 'default';
  content = require('content');
}

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

        <Logo />

        { this.props.children }
      </div>
    );
  },

  childContextTypes: {
    config: React.PropTypes.object.isRequired,
    content: React.PropTypes.object.isRequired,
    testString: React.PropTypes.string.isRequired
  },

  getChildContext () {
    return {
      config: config,
      content: content,
      testString: testString
    };
  },

  componentWillMount() {
    // this.updateAnalytics({
    //   category: 'page-view',
    //   action: 'visit',
    //   label: 'landing:' + this.context.testString,
    //   value: 10
    // });
  },

  updateAnalytics (options) {
    // ga.event(options);
  }

});

export default App;
