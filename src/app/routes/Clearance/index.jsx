import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Input from './Input'
import Loading from './Loading'
import Error from './Error'
import Result from './Result'

import {
  CHANGE_SUBMISSION_STATUS,
  SUBMISSION_STATUS,
  CHANGE_SUBMISSION
} from 'app/constants/submission'

import {
  STATUS
} from 'app/constants'

class Clearance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: STATUS.INPUT,
      input: {},
      result: {}
    }

    this.handleInputSubmit = this.handleInputSubmit.bind(this)
    this.handleLoadComplete = this.handleLoadComplete.bind(this)
    this.handleLoadCancel = this.handleLoadCancel.bind(this)
    this.handleClearance = this.handleClearance.bind(this)
  }

  componentWillMount() {
    this.props.dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.CLEARANCE })
  }

  handleInputSubmit(input) {
    this.setState({ status: STATUS.LOADING, input })
  }

  handleLoadComplete(error, result) {
    this.setState({ status: (error) ? STATUS.ERROR : STATUS.RESULT, result })
  }

  handleLoadCancel() {
    this.setState({ status: STATUS.INPUT })
  }

  handleClearance(result) {
    if (result.success) {
      const submission = Object.assign(this.state.input, { passedClearance: true, status: 'SUBMISSION' })

      this.props.dispatch({ type: CHANGE_SUBMISSION,
        submission,
        submissionFormParams: {
          primaryInsuredName: { disabled: true },

          primaryInsuredAddress: { disabled: true },
          primaryInsuredCity: { disabled: true },
          primaryInsuredState: { disabled: true },
          primaryInsuredZipcode: { disabled: true },

          projectAddress: { disabled: true },
          projectCity: { disabled: true },
          projectState: { disabled: true },
          projectZipcode: { disabled: true }
        }
      })
      
      this.props.dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.CREATING })

      this.props.dispatch(push('/form'))
    } else {
      this.setState({ status: STATUS.INPUT })
    }
  }

  render() {
    const subcomponentMap = {
      INPUT: <Input input={this.state.input} handleSubmit={this.handleInputSubmit} />,
      LOADING: <Loading
        handleSubmit={this.handleLoadComplete}
        handleCancel={this.handleLoadCancel}
        input={this.state.input}
      />,
      ERROR: <Error />,
      RESULT: <Result
        handleSubmit={this.handleClearance}
        input={this.state.input} result={this.state.result}
      />
    }

    return (
      <div className="page clearance">
        {
          subcomponentMap[this.state.status]
        }
      </div>
    )
  }
}

Clearance.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect((store) => {
  return ({
    submission: store.app.submission
  })
})(Clearance)