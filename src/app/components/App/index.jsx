import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Helmet from 'react-helmet'
import querystring from 'querystring'
import { connect } from 'react-redux'
import config from 'config'
import Header from 'components/Header'
import { Alert, Fade } from 'react-bootstrap'

const content = require('content')

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

        {this.props.display.show === true ?
          <div className="AlertMainComp">
            <div className="mainAlert" >
              <Alert bsStyle={this.props.display.bsStyle} onDismiss={this.closeAlert}>
              <div dangerouslySetInnerHTML={ {__html:this.props.display.message}}></div>
              </Alert>
            </div>
          </div> :
          <div />
        }

        { this.props.children }


      </div>
    )
  }

  getChildContext() {
    return { config, content }
  }

}

App.childContextTypes = {
  config: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired
}

App.propTypes = {
  display: PropTypes.object
}

export default connect((store) => {
  const { display } = store.alerts

  return {
    display
  }
})(App)
