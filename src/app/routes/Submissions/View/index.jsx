import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Moment from 'moment'
import { formatDollars } from 'app/utils/utilities'
import * as actions from 'app/actions/submissionActions'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'

import mx from 'app/utils/MixpanelInterface'

class SubmissionView extends Component {
  constructor() {
    super()

    this.state = ({
      chartData: []
    })
  }

  componentDidMount() {
    console.log('this.props.submissionData', this.props.submissionData)
    this.loadSubmissions(this.props.submissionData)
  }
  
  loadSubmissions(submissionsArray) {
    const list = submissionsArray.map((item) => {
      const premiumType = item.rating[item.type]

      return ({
        ...item,
        primaryInsuredName: item.primaryInsuredName,
        totalCost: item.totalCost ? formatDollars(item.totalCost) : 'n/a',
        quotedPremium: (premiumType && premiumType.premium) ? formatDollars(premiumType.premium) : 'n/a',
        totalPremium: (premiumType && premiumType.totalPremium) ? formatDollars(premiumType.totalPremium) : 'n/a',
        type: item.type,
        dateCreated: Moment(item.createdAt).format('MM-DD-YY hh:mma'),
        dateUpdated: Moment(item.updatedAt).format('MM-DD-YY hh:mma'),
        quoteStatus: (premiumType && premiumType.premium) ? 'Yes' : 'No'
      })
    })

    this.setState({
      chartData: list
    })
  }

  goToPage(submission) {
    mx.customEvent(
      'submission',
      'edit',
      {
        'Named Insured': submission.primaryNamedInsured,
        Quoted: submission.instantQuote,
        'Confirmation Number': submission.confirmationNumber,
        Type: submission.type
      }
    )
    this.props.editSubmission(submission)
  }

  render() {
    const selectFormatter = (cell, row) => {
      if (row.quoteStatus === 'Yes') {
        return (
          <Button
            onClick={() => {
              this.goToPage(row)
            }}
          >Edit</Button>
        )
      }
      return ''
    }

    const options = {
      defaultSortName: 'updatedAt',  // default sort column name
      defaultSortOrder: 'desc'  // default sort order,
    }

    return (
      <div>
        <h3>Your Submissions</h3>
        <BootstrapTable
          data={this.state.chartData}
          condensed={true}
          options={options}
          search
          trClassName="submissionHover"
          key={1}
          pagination
          multiColumnSearch
        >
          <TableHeaderColumn
            dataField="_id"
            isKey={true}
            hidden
          />
          <TableHeaderColumn
            dataField="updatedAt"
            hidden
          />
          <TableHeaderColumn
            dataField="primaryInsuredName"
            dataSort={true}
            width="100px"
          >Primary Named Insured</TableHeaderColumn>
          <TableHeaderColumn
            dataField="quoteStatus"
            dataSort={true}
            width="35px"
          >Was <br />Submission <br />Priced?</TableHeaderColumn>
          <TableHeaderColumn
            width="40px"
            dataField="quotedPremium"
            dataSort={true}
          >Quoted <br />Premium</TableHeaderColumn>
          <TableHeaderColumn
            width="40px"
            dataField="totalCost"
            dataSort={true}
          >Total <br />Cost</TableHeaderColumn>
          <TableHeaderColumn
            width="40px"
            dataField="totalPremium"
            dataSort={true}
          >Total <br />Premium</TableHeaderColumn>
          <TableHeaderColumn
            width="20px"
            dataField="type"
            dataSort={true}
          >Type</TableHeaderColumn>
          <TableHeaderColumn
            width="55px"
            dataField="dateCreated"
            dataSort={true}
          >Date <br />Created</TableHeaderColumn>
          <TableHeaderColumn
            width="55px"
            dataField="dateCreated"
            dataSort={true}
          >Date <br />Updated</TableHeaderColumn>
          {/* <TableHeaderColumn
            width="25px"
            dataField="id"
            hidden={false}
            dataFormat={selectFormatter}
          >Edit</TableHeaderColumn>*/}
        </BootstrapTable>
      </div>
    )
  }
}

SubmissionView.propTypes = {
  // editSubmission: PropTypes.func.isRequired,
  submissionData: PropTypes.array.isRequired
}

export default SubmissionView