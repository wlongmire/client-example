import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import config from 'config';
import Logo from 'components/Logo';

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
  }

});

export default App;
