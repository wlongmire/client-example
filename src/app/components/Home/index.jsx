import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import * as actions from './actions';
import { formatDollars } from '../../utils/utilities';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button, Panel } from 'react-bootstrap';

class Home extends Component{
  constructor(){
    super();
    this.state = ({
      chartData: []
    });
  }

  componentDidMount() {
    if(this.props.submissions.data){
      this.loadSubmissions(this.props.submissions.data.submissions);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.submissions.data && !this.props.submissions.data){
      this.loadSubmissions(nextProps.submissions.data.submissions);
    }
  }
  componentWillMount(){
    if(this.props.user.state.user) {
      this.props.getSubmissions(this.props.user.state.user['_brokerId']);
    }
  }

  loadSubmissions(submissionsArray){

    let list = [];

    for (let item of submissionsArray){
      const premiumType = item[`${item.type}Premium`];
      const totalCost = premiumType ? (premiumType.totalCost) : '';
      list.push({
        ...item,
        primaryNamedInsured: item.primaryNamedInsured,
        totalCost: (premiumType && premiumType.totalCost) ? formatDollars(premiumType.totalCost) : 'n/a',
        quotedPremium: (premiumType && premiumType.quotedPremium) ? formatDollars(premiumType.quotedPremium) : 'n/a',
        totalPremium: (premiumType && premiumType.totalPremium) ? formatDollars(premiumType.totalPremium) : 'n/a',
        type: item.type,
        dateCreated: Moment(item.createdAt).format('MM-DD-YY hh:mma'),
        dateUpdated: Moment(item.updatedAt).format('MM-DD-YY hh:mma'),
        quouteStatus: (premiumType && premiumType.quotedPremium) ? 'Yes' : 'No'

      });
    }
    
    this.setState({
      chartData: list
    });
  }

  goToPage(submission){
    this.props.editSubmission(submission);
  }

  render(){
    const selectFormatter = (cell, row) => {
      return (
        <Button onClick={ () => { this.goToPage(row);}}>Edit</Button>
      );
    };

    const options = {
      defaultSortName: 'updatedAt',  // default sort column name
      defaultSortOrder: 'desc'  // default sort order,
    };

    return (
      <div>
        <h3><b><u>Your Submissions</u></b></h3>
        <BootstrapTable
          data={this.state.chartData}
          condensed={true}
          options={options}
          search
          trClassName="submissionHover"
          //hover
          pagination
          multiColumnSearch
          >
          <TableHeaderColumn
            dataField="_id"
            isKey={true}
            hidden
            ></TableHeaderColumn>
            <TableHeaderColumn
            dataField="updatedAt"
            hidden
            ></TableHeaderColumn>
          <TableHeaderColumn
            dataField="primaryNamedInsured"
            dataSort={true}
            width="100px"
            >Primary Named Insured</TableHeaderColumn>
          <TableHeaderColumn
            dataField="quouteStatus"
            dataSort={true}
            width="35px"
            >Was <br/>Submission<br/> Quouted?</TableHeaderColumn>
          <TableHeaderColumn
            width="40px"
            dataField="quotedPremium"
            dataSort={true}
            >Quoted <br/>Premium</TableHeaderColumn>
          <TableHeaderColumn
            width="30px"
            dataField="totalCost"
            dataSort={true}
            >Total <br/>Cost</TableHeaderColumn>
          <TableHeaderColumn
            width="40px"
            dataField="totalPremium"
            dataSort={true}
            >Total <br/>Premium</TableHeaderColumn>
          <TableHeaderColumn
            width="20px"
            dataField="type"
            dataSort={true}
            >Type</TableHeaderColumn>
          <TableHeaderColumn
            width="50px"
            dataField="dateCreated"
            dataSort={true}
            >Date <br/>Created</TableHeaderColumn>
            <TableHeaderColumn
            width="50px"
            dataField="dateCreated"
            dataSort={true}
            >Date <br/>Updated</TableHeaderColumn>
          <TableHeaderColumn
            width="20px"
            dataField="id"
            dataFormat={ selectFormatter }
            >Edit</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user,
    submissions: state.submissions
  };
}

export default connect(mapStateToProps, actions)(Home);
