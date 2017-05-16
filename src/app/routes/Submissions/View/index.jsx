import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'moment'

import { formatDollars } from 'app/utils/utilities'
import * as actions from 'src/app/reducers/SubmissionView/actions'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button, Panel } from 'react-bootstrap'

import mx from 'app/utils/MixpanelInterface'
import constants from 'app/constants/app'

class SubmissionView extends Component {
  constructor() {
    super()

    localStorage.setItem('editing', false)

    this.state = ({
      chartData: []
    })
  }

  componentDidMount() {
    this.loadSubmissions(this.props.sumbissionData.submissions)
  }

  loadSubmissions(submissionsArray) {
    const list = []
    for (let item of submissionsArray) {
      if (!item.rating)
        continue;

      const premiumType = item.rating[`${item.type}`];    
      const totalCost = premiumType ? (premiumType.totalCost) : '';
      list.push({
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
    }

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

    console.log('submission on edit', submission)
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

    console.log('xx22 this.state', this.state)

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
          <TableHeaderColumn
            width="25px"
            dataField="id"
            hidden={false}
            dataFormat={selectFormatter}
          >Edit</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('xx22 CURRENT STORE', state)
  return {
    user: state.user,
    submissions: state.submissions
  }
}

export default connect(mapStateToProps, actions)(SubmissionView)