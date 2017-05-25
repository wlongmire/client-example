import React, { Component } from 'react'

import Helmet from 'react-helmet'
import querystring from 'querystring'

import config from 'config'
import Header from 'components/Header'

let query = querystring.parse(window.location.search.slice(1))
let content = require('content')

class App extends Component {
  render() {
    const baseMeta = [
      {
        name: 'description',
        content: content.description
      },
      {
        property: 'og:type',
        content: 'site'
      }
    ]

    const titleTemplate = `${content.title} | %s`

    return (
      <div className="app">
        <Helmet
          titleTemplate={titleTemplate}
          meta={baseMeta}
        />

        <Header />

        { this.props.children }
      </div>
    );
  }

  getChildContext() {
    return { config, content }
  }

}

App.childContextTypes = {
  config: React.PropTypes.object.isRequired,
  content: React.PropTypes.object.isRequired
}

export default App
