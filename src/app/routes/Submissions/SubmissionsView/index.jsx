import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { editSubmission, submissionEdit } from './../../../actions/submissionActions'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button, Col, Row } from 'react-bootstrap'

export class SubmissionView extends Component {
  goToPage(submission) {
    this.props.editSubmission(submission, this.props.user)
    this.props.submissionEdit({
      'Named Insured': submission.primaryNamedInsured,
      Quoted: submission.instantQuote,
      ClearanceStatus: submission.clearanceStatus,
      Type: submission.type
    })
  }

  render() {
    const selectFormatter = (cell, row) => {
      if (row.ableToEdit === 'Yes') {
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
      defaultSortOrder: 'desc',  // default sort order,
      noDataText: `${this.props.user.brokerName} hasn't completed any submissions. Be the first!`
    }

    return (
      <div>
        <h3>Submissions</h3>
        <Col lg={12} md={12}>
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
              width="50px"
            >Submission <br />Status</TableHeaderColumn>
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
              width="25px"
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
        </Col>
      </div>
    )
  }
}

SubmissionView.propTypes = {
  editSubmission: PropTypes.func.isRequired,
  submissions: PropTypes.array.isRequired,
  user: PropTypes.object,
  submissionEdit: PropTypes.func.isRequired
}

export default connect((store) => {
  return ({
    user: store.user
  })
}, { editSubmission, submissionEdit })(SubmissionView)