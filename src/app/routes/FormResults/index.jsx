import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Loading from './Loading'
import Error from './Error'
import Quote from './Quote'
import Knockout from './Knockout'

import { isEmpty } from 'lodash'

import {
  CHANGE_SUBMISSION_STATUS,
  SUBMISSION_STATUS
} from 'app/constants/submission'

import { 
  submissionQuoted,
  submissionKnockedOut,
  submissionFailed
} from 'app/actions/submissionActions'

import {
  STATUS
} from 'app/constants'

class FormResults extends Component {
  constructor(props) {
    super(props)

    this.state = {
      quoteStatus: STATUS.LOADING,
      emailStatus: STATUS.LOADING,
      ratings: {}
    }

    this.handleLoadComplete = this.handleLoadComplete.bind(this)
    this.handleEmailStatus = this.handleEmailStatus.bind(this)
  }

  componentDidMount() {
    if (isEmpty(this.props.submission)) {
      this.props.dispatch(push('/productChoice'))
    }

    this.props.dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.QUOTE })
  }

  handleEmailStatus(result) {
    this.setState({
      emailStatus: (result.success) ? STATUS.SUCCESS : STATUS.ERROR
    })
  }

  handleLoadComplete(error, ratings) {
    const { submission } = this.props
    const type = this.props.submission.type

    this.setState({
      quoteStatus: (error) ? STATUS.ERROR : ((ratings[submission.type].instantQuote) ? STATUS.QUOTE : STATUS.KNOCKOUT),
      ratings
    })

    if (error) {
      this.props.dispatch(submissionFailed({
        Type: this.props.submission
      }))
    } 
  }

  render() {
    const subcomponentMap = {
      LOADING: <Loading
        handleSubmit={this.handleLoadComplete}
        handleEmailStatus={this.handleEmailStatus}
        submission={this.props.submission}
      />,
      ERROR: <Error />,
      QUOTE: <Quote
        submission={this.props.submission}
        emailStatus={this.state.emailStatus}
        ratings={this.state.ratings}
      />,
      KNOCKOUT: <Knockout
        emailStatus={this.state.emailStatus}
        ratings={this.state.ratings}
        submission={this.props.submission} 
      />
    }

    if (isEmpty(this.props.submission)) {
      return (<div />)
    }

    return (
      <div className="formResults routeContainer">
        {
          subcomponentMap[this.state.quoteStatus]
        }
      </div>
    )
  }
}

FormResults.propTypes = {
  submission: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect((store) => {
  return ({
    submission: store.app.submission,
    user: store.user
  })
})(FormResults)