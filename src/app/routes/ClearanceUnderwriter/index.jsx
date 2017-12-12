import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import config from 'config'

import {
  CHANGE_SUBMISSION_STATUS,
  SUBMISSION_STATUS,
  CHANGE_SUBMISSION
} from 'app/constants/submission'

import {
  STATUS
} from 'app/constants'

import { connect } from 'react-redux'
import Input from './Input'

//Underwriter Access:
//Updated "Clearance" page for underwriters
//Bypasses clearance all together and passes basic submissions data to formUnderwriter
class ClearanceUnderwrtier extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: STATUS.INPUT,
      input: {},
      result: {}
    }

    this.handleInputSubmit = this.handleInputSubmit.bind(this)
    this.handleSubmission = this.handleSubmission.bind(this)
  }

  componentWillMount() {
    //redirect if user is not an underwriter
    if (this.props.user.brokerId !== config.underwriterBrokerId) {
      this.props.dispatch(push('/'))
    }

    this.props.dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.CLEARANCE })
  }

  handleInputSubmit(result) {
    this.handleSubmission(result)
  }

  handleSubmission(result) {
    let submission
    let submissionFormParams

    if (
      result.projectAddress &&
      result.projectAddress.projectState === 'New York' &&
      this.props.submission.type === 'ocp'
      ) {
      // if submission for OCP and STATE is NY
      submission = Object.assign(result, { clearanceStatus: 'pass', status: 'SUBMISSION', clearanceMatches: [] })
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
      submission = { ...result, nycha: 'false', clearanceStatus: 'pass', status: 'SUBMISSION', clearanceMatches: [] }
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
      submission = { ...result, clearanceStatus: 'pass', status: 'SUBMISSION', clearanceMatches: [] }
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
    this.props.dispatch(push('/formunderwriter'))
  }

  render() {
    const subcomponentMap = {
      INPUT: <Input 
        input={this.state.input}
        handleSubmit={this.handleInputSubmit}
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

ClearanceUnderwrtier.propTypes = {
  dispatch: PropTypes.func.isRequired,
  submission: PropTypes.object.isRequired,
  user: PropTypes.object
}

export default connect((store) => {
  return ({
    submission: store.app.submission,
    user: store.user
  })
})(ClearanceUnderwrtier)