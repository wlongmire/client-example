import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Moment from 'moment'
import { formatDollars } from 'app/utils/utilities'
import * as actions from 'app/actions/submissionActions'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import mx from 'app/utils/MixpanelInterface'

export class SubmissionView extends Component {

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
          data={this.props.submissions}
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
            dataField="dateUpdated"
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

SubmissionView.propTypes = {
  editSubmission: PropTypes.func.isRequired,
  submissions: PropTypes.array.isRequired
}

export default connect(null, actions)(SubmissionView)