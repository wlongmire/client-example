import React from 'react';
import Helmet from 'react-helmet';
import querystring from 'querystring';
// import ga from 'react-ga';

import config from 'config';
import Logo from 'components/Logo';

let query = querystring.parse(window.location.search.slice(1));


let content = require('content');
let testString = 'default';

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
