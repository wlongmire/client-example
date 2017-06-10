import React, { Component } from 'react'

import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'

import {
  getClearance 
} from 'app/actions/submissionActions'

class Loading extends Component {
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

    console.log('input LOADING', input)
    getClearance(input).then((resp) => {
      this.props.handleSubmit(
        !resp.success,
        {
          success: (resp.matches.length === 0),
          matches: resp.matches
        })
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

export default connect((store) => {
  return ({
    user: store.user
  })
})(Loading)