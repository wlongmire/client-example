import React, { Component } from 'react'

import styles from './styles'

export class UnsupportedBrowser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      browser : this.checkBrowser()
    }

    this.close = this.close.bind(this)
  }

  checkBrowser() {
    // per https://codepen.io/gapcode/pen/vEJNZN

    const ua = window.navigator.userAgent;

    const msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    const edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
  }

  close(event) {
    event.preventDefault()
    this.setState({browser : false})
  }

  render() {
    const browser = this.state.browser

    return (
      <div>
        {!browser &&
          <div/>
        }

        {browser && browser >= 11 &&
          <div className="unsupported-browser amber">
            <h1>Recommended Web Browsers</h1>
            <p>
              Use <a href="http://getfirefox.com" target="_blank">Firefox</a> or <a href=
              "https://www.google.com/chrome/browser/desktop/index.html" target="_blank">Google
              Chrome</a> for the best Owner's Edge experience.
              Some features may not work in this browser.
            </p>
            <p>
              <a href="#" onClick={this.close}>Okay, hide this message</a>
            </p>
          </div>
        }

        {browser && browser < 11 &&
          <div className="unsupported-browser red">
            <h1>Unsupported Browser</h1>
            <p>
              You are likely to experience issues with this browser.
              Please try <a href=
              "https://www.google.com/chrome/browser/desktop/index.html" target="_blank">Google
              Chrome</a> or <a href="http://getfirefox.com" target="_blank">Firefox</a>
            </p>
            <p>
              <a href="#" onClick={this.close}>Okay, hide this message</a>
            </p>
          </div>
        }
      </div>
    )
  }

}

export default UnsupportedBrowser
