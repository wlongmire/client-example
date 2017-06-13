import React, { Component, PropTypes } from 'react'

import {connect} from 'react-redux'
import { push } from 'react-router-redux'
import mx from 'app/utils/MixpanelInterface';

import { Button } from 'react-bootstrap'
import ToggleDisplay from 'components/shared/ToggleDisplay'

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

  componentDidMount(){
    if (isEmpty(this.props.submission)) {
      this.props.dispatch(push('/productChoice'))
    }

    this.props.dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.QUOTE })
  }

  handleEmailStatus(result) {
    this.setState({
      emailStatus: (result.success)?STATUS.SUCCESS:STATUS.ERROR
    })
  }

  handleLoadComplete(error, ratings) {
    const {submission} = this.props;

    this.setState({
      quoteStatus: (error) ? STATUS.ERROR:((ratings[submission.type].instantQuote)?STATUS.QUOTE:STATUS.KNOCKOUT),
      ratings
    })

    // mixpanel triggers
    if (error) {
      mx.customEvent(
          'submission',
          'error',
          { Type: this.props.submission }
        );
    } else if (ratings[submission.type].instantQuote) {
      // AK_TO_DO - fix mx
      // mx.customEvent(
      //     'submission',
      //     'quoted',
      //     {
      //       Type: this.props.submission.type,
      //       TotalPremium: this.props.submission.rating[this.props.submission.type].totalPremium,
      //       TotalExcessPremium: 
      //         this.props.submission.rating[this.props.submission.type].excessPremium
      //     }
      //   );
    } else {
      mx.customEvent(
          'submission',
          'knockout',
          {
            Type: this.props.submission.type,
            Reasons: this.props.submission.rating[this.props.submission.type].reason
          }
        )
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

    if (isEmpty(this.props.submission))
      return (<div></div>)

    return (
      <div className="page formResults">
        {
          subcomponentMap[this.state.quoteStatus]
        }
      </div>
    )
  }

}

export default connect((store) => {
  return ({
    submission: store.app.submission
  })
})(FormResults)