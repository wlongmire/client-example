import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { Row, Col, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { createAlert } from '../../actions/userActions'
import { getClearanceInfo, setClearance } from '../../actions/submissionActions';
import ToggleDisplay from '../../components/shared/ToggleDisplay'
import TableComponent from './../../components/shared/TableComponent'
import { isDefined } from '../../utils/utilities'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

export class PassClearance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
      submission: null,
      submitting: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }



  componentDidMount() {

    document.body.className = 'body-clearance-pass'
    if (!this.props.location.query.s) {
      this.props.dispatch(createAlert('This submission cannot be found. Please double check the link and try again. If you are having issues, please contact support', 'info'))
      return browserHistory.push('/')
    }
    getClearanceInfo(this.props.location.query.s)
      .then(submission => {
        if (submission === null || !isDefined(submission.clearanceStatus)) {
          this.props.dispatch(createAlert('This submission cannot be found. Please double check the link and try again. If you are having issues, please contact support', 'info'))
        }
        else if (submission.clearanceStatus !== 'pending') {
          this.props.dispatch(createAlert('This submission has already been reviewed', 'info'))
        }
        else {
          this.setState({ ...this.state, step: 1, submission: submission })
        }
      })
  }

  handleSubmit() {
    this.setState({...this.state, submitting:true});
    const status = 'pass'
    setClearance(this.props.location.query.s, status)
      .then(() => {
        this.setState({ ...this.state, step: 2 })
      })
  }

  handleCancel(){
    window.open(location, '_self').close();
  }

  render() {
    const clearanceMatches = this.state.submission === null ? {} : {
      data: this.state.submission.clearanceMatches,
      columns: [
        { dataField: 'primaryInsured', title: 'Name', isKey: true },
        { dataField: 'projectAddress', title: 'Project Address' },
        { dataField: 'mailingAddress', title: 'Mailing Address' }
      ]
    }

    function generateColumns(columns) {
      return columns.map((col) => {
        const colAttrs = Object.assign(
          {
            isSortable: false,
            isKey: false,
            sortFunc: null,
            width: null
          },
          col
        )


        return (<TableHeaderColumn
          key={colAttrs.dataField}
          dataField={colAttrs.dataField}
          width={colAttrs.width}
          isKey={colAttrs.isKey}
          dataSort={colAttrs.isSortable}
          dataFormat={colAttrs.dataFormat}
          sortFunc={colAttrs.sortFunc}
          hidden={(colAttrs.hidden || false)}
        >
          {col.title}
        </TableHeaderColumn>)
      })
    }

    return (
      <div>
      <ToggleDisplay
      show={this.state.step === 0}
      render={()=> <div className="clearanceAlertContainer">
      <h3>Owners Edge: Review and Confirm</h3>
      </div>}
    />
        <ToggleDisplay
          show={this.state.step === 1}
          render={() => (
          <div className="clearancePassContainer">
            <h3>Owner's Edge: Review and Confirm</h3>
            <h2>Pass clearance for this submission?</h2>
            <div className="infoContainer">
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <h4>SUBMITTED INFORMATION</h4>
                  <Row>
                    <FormGroup>
                    <ControlLabel>Name:</ControlLabel>
                    <FormControl.Static>
                    {this.state.submission.primaryInsuredName}
                    </FormControl.Static>
                    </FormGroup>
                  </Row>
                  <Row>
                  <FormGroup>
                  <ControlLabel>Project Address:</ControlLabel>
                  <FormControl.Static>
                    {this.state.submission.projectAddress.projectAddress}
                    <br/>
                    {this.state.submission.projectAddress.projectCity}, {this.state.submission.projectAddress.projectState}         {this.state.submission.projectAddress.projectZip}
                    </FormControl.Static>
                    </FormGroup>
                  </Row>
                  <Row>
                  <FormGroup>
                  <ControlLabel>Insured Address:</ControlLabel>
                  <FormControl.Static>
                    {this.state.submission.insuredAddress.primaryInsuredAddress}
                    <br/>
                    {this.state.submission.insuredAddress.primaryInsuredCity}, {this.state.submission.insuredAddress.primaryInsuredState}         {this.state.submission.insuredAddress.primaryInsuredZip}
                    </FormControl.Static>
                    </FormGroup>
                  </Row>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <h4>POSSIBLE MATCHES</h4>
                  <div className="tableElement">
                  <BootstrapTable
                    data={clearanceMatches.data}
                    bordered={false}
                  >
                    {generateColumns(clearanceMatches.columns)}
                  </BootstrapTable>
                  </div>
                </Col>

              </Row>
              </div>

              <div><Button className="passPrimary" onClick={() => { return this.handleSubmit() }}>Confirm and Pass</Button></div>
              <ToggleDisplay show={this.state.submitting} render={()=>(<div className="confirmationLoader">Confirming...</div>)} />
          </div>)}
        />
        <ToggleDisplay
          show={this.state.step === 2}
          render={() => (<div className="clearanceConfirmation">
          <h3>Owner's Edge</h3>
          <h2>Clearance Passed</h2>
          <div className="infoContainer">
            <p>You have passed clearance for this project. An update will be automatically sent to the broker.</p>
            <p className="footer">You may close this window</p>
          </div>
          </div>)}
        />
      </div>
    )
  }
}

export default connect()(PassClearance)