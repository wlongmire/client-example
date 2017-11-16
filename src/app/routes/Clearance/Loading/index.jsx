import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'
import config from 'config'
import * as actions from './../../../actions/userActions'
import {
  getClearance 
} from './../../../actions/submissionActions'

export class Loading extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const input = {
      name: this.props.input.primaryInsuredName,
      addresses: [
        this.props.input.projectAddress,
        this.props.input.insuredAddress
      ],
      user: this.props.user,
      type: this.props.submission.type
    }

    getClearance(input, this.props.user).then((resp) => {
      if (resp.status === 'authError') {
        console.log('THERE WAS AN AUTH ERROR FOR SOME REASON ==>', resp)
        return this.props.logout()
      }
      
      return this.props.handleSubmit(resp, input)
    }).catch((error) => {
      this.props.handleSubmit({ success: false })
    })
  }

  render() {
    return (
      <form>
        <h3>Checking Prior Submissions</h3>
        <h4>Please Wait while we scan for matches.</h4>

        <div className="loadingImg">
          <img src={`${config.assetsURL}/images/ajax-loader.gif`} />
        </div>
      </form>
    )
  }
}

Loading.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  input: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  submission: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export default connect((store) => {
  return ({
    user: store.user,
    submission: store.app.submission
  })
}, actions)(Loading)