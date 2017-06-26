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

  handleLoadComplete(error, result, input) {
    this.setState({ status: (error) ? STATUS.ERROR : STATUS.RESULT, result })
    console.log('GETTING TO TOP CLEARANCE -- result', result)
    console.log('GETTING TO TOP CLEARANCE -- input', input)
    // AK_TO_DO - hit backend with function
  }

  handleLoadCancel() {
    this.setState({ status: STATUS.INPUT })
  }

  handleClearance(result) {
    if (result.success) {
      let submission
      let submissionFormParams

      console.log('THIS STATE INPUT', this.state.input)
      if (
        this.state.input.projectAddress &&
        this.state.input.projectAddress.projectState === 'New York' &&
        this.props.submission.type === 'ocp'
        ) {
        // if submission for OCP and STATE is NY
        submission = Object.assign(this.state.input, { passedClearance: true, status: 'SUBMISSION' })
        submissionFormParams = {
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
      } else if (this.props.submission.type === 'ocp') {
        // if submission is for OCP and state is NOT NY
        submission = { ...this.state.input, nycha: 'false', passedClearance: true, status: 'SUBMISSION' }
        submissionFormParams = {
          primaryInsuredName: { disabled: true },

          primaryInsuredAddress: { disabled: true },
          primaryInsuredCity: { disabled: true },
          primaryInsuredState: { disabled: true },
          primaryInsuredZipcode: { disabled: true },

          projectAddress: { disabled: true },
          projectCity: { disabled: true },
          projectState: { disabled: true },
          projectZipcode: { disabled: true },
          // nycha is an additional params that is disabled
          // when state is not New York
          nycha: { disabled: true }
        }
      } else {
        // if submission is for OI
        submission = { ...this.state.input, passedClearance: true, status: 'SUBMISSION' }
        submissionFormParams = {
          primaryInsuredName: { disabled: true },

          primaryInsuredAddress: { disabled: true },
          primaryInsuredCity: { disabled: true },
          primaryInsuredState: { disabled: true },
          primaryInsuredZipcode: { disabled: true },

          projectAddress: { disabled: true },
          projectCity: { disabled: true },
          projectState: { disabled: true },
          projectZipcode: { disabled: true },
        }
      }

      this.props.dispatch({ type: CHANGE_SUBMISSION,
        submission,
        submissionFormParams
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
  dispatch: PropTypes.func.isRequired,
  submission: PropTypes.object.isRequired
}

export default connect((store) => {
  return ({
    submission: store.app.submission
  })
})(Clearance)