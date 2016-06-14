import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

// import config from '../'

const App = React.createClass({
  render() {
    let baseMeta = [
      {
        'name': 'description',
        'content': 'Skonk Works U1 App'
      },
      {
        'property': 'og:type',
        'content': 'site'
      }
    ];
    return (
      <div className='app'>
        <Helmet
          titleTemplate='Skonk Works U1 | %s'
          meta={baseMeta}
        />
        { this.props.children }
      </div>
    );
  }

});

export default App;
