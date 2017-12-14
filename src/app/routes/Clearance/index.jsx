import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { browserHistory } from 'react-router'
import config from 'config'
import Input from './Input'
import Loading from './Loading'
import Error from './Error'
import Result from './Result'
import { 
  sendClearanceEmail,
  submissionClearancePassed,
  submissionClearanceFailed,
  submissionClearancePending
} from 'app/actions/submissionActions'

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
    this.handleReturnToInput = this.handleReturnToInput.bind(this)
    this.handleClearance = this.handleClearance.bind(this)
  }

  componentWillMount() {
    this.props.dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.CLEARANCE })
  }

  handleInputSubmit(input) {
    this.setState({ status: STATUS.LOADING, input })
  }

  handleLoadComplete(result, input) {
    if (!result.success) {
      return this.setState({ status: STATUS.ERROR, result })
    }

    if (result.clearanceStatus === 'fail') {
      this.setState({ status: STATUS.RESULT, result })

      if (config.clearanceFailEmail) {
        sendClearanceEmail(config.clearanceFailEmail, 'clearanceFail', this.props.user, input, result.matches)
<<<<<<< HEAD
        sendClearanceEmail(config.ownerEdgeEmail, 'clearanceFail', this.props.user, input, result.matches) 
      }      
      this.props.dispatch(submissionClearanceFailed(this.props.submission.type, result.matches))
=======
        sendClearanceEmail(config.ownerEdgeEmail, 'clearanceFail', this.props.user, input, result.matches)
      }

      mx.customEvent(
        'submission',
        'failClearance', {
          Type: this.props.submission.type,
          Matches: result.matches
        })
>>>>>>> origin/master
    } else {
      this.setState({ status: STATUS.CREATING, result })
      this.handleClearance(result)

      // mixpanel event
      if (result.clearanceStatus == 'pass') {
        this.props.dispatch(submissionClearancePassed(this.props.submission.type))
      } else if (result.clearanceStatus == 'pending') {
        this.props.dispatch(submissionClearancePending(this.props.submission.type, result.matches))
      }
    }
  }

  handleReturnToInput() {
    this.setState({ status: STATUS.INPUT })
  }

  handleClearance(result) {
    let submission
    let submissionFormParams

    if (
      this.state.input.projectAddress &&
      this.state.input.projectAddress.projectState === 'New York' &&
      this.props.submission.type === 'ocp'
      ) {
      // if submission for OCP and STATE is NY
      submission = Object.assign(this.state.input, { clearanceStatus: result.clearanceStatus, status: 'SUBMISSION', clearanceMatches:this.state.result.matches })
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
      submission = { ...this.state.input, nycha: 'false', clearanceStatus: result.clearanceStatus, status: 'SUBMISSION', clearanceMatches:this.state.result.matches }
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
      submission = { ...this.state.input, clearanceStatus: result.clearanceStatus, status: 'SUBMISSION', clearanceMatches:this.state.result.matches }
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
      payload: {
        submission,
        submissionFormParams
      }
    })

    this.props.dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.CREATING })
    this.props.dispatch(push('/form'))
  }

  render() {
    const subcomponentMap = {
      INPUT: <Input input={this.state.input} handleSubmit={this.handleInputSubmit} />,
      LOADING: <Loading
        handleSubmit={this.handleLoadComplete}
        input={this.state.input}
      />,
      ERROR: <Error />,
      RESULT: <Result
        handleSubmit={this.handleReturnToInput}
        input={this.state.input} result={this.state.result}
      />
    }

    return (
      <div className="clearance routeContainer">
        {
          subcomponentMap[this.state.status]
        }
      </div>
    )
  }
}

Clearance.propTypes = {
  dispatch: PropTypes.func.isRequired,
  submission: PropTypes.object.isRequired,
  user: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect((store) => {
  return ({
    submission: store.app.submission,
    user: store.user
  })
})(Clearance)