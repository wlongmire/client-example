import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'
import * as actions from 'app/actions/userActions'
import {
  getClearance 
} from 'app/actions/submissionActions'

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
      user: this.props.user
    }

    getClearance(input, this.props.user).then((resp) => {
      if (resp.status === 'authError') {
        return this.props.logout()
      }

      if (resp.success && resp.success === true) {
        const errorFlag = false
        return this.props.handleSubmit(
          errorFlag,
          {
            success: (resp.matches.length === 0),
            matches: resp.matches
          }, input)
      } else {
        const errorFlag = true
        return this.props.handleSubmit(errorFlag)
      }
    }).catch(() => {
      const errorFlag = true
      this.props.handleSubmit(errorFlag)
    })
  }

  render() {
    return (
      <form>
        <h3>Checking Prior Submissions</h3>
        <h4>Please Wait while we scan for matches.</h4>

        <div className="loadingImg">
          <img src="https://s3.amazonaws.com/ownersedge-cdn/images/ajax-loader.gif" />
        </div>

        <ButtonGroup>
          <Button onClick={this.props.handleCancel} className="btn">
            Return to Clearance Form
          </Button>
        </ButtonGroup>
      </form>
    )
  }
}

Loading.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  input: PropTypes.object.isRequired,
  handleCancel: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export default connect((store) => {
  return ({
    user: store.user
  })
}, actions)(Loading)