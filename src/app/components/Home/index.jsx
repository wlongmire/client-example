import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import * as actions from './actions';
import { formatDollars } from '../../utils/utilities';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';

class Home extends Component{
  constructor(){
    super();
    this.state = ({
      chartData: []
    });
  }

  componentDidMount() {
    if(this.props.submissions.data){
      console.log('TEST456 COMPONENT DID MOUNT', this.props.submissions.data);
      this.loadSubmissions(this.props.submissions.data.submissions);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('TEST456 NEXT PROPS', nextProps.submissions);
    console.log('TEST456 THIS PROPS', this.props.submissions);

    if (nextProps.submissions.data && !this.props.submissions.data){
      console.log('TEST456 next params', nextProps.submissions.data);
      this.loadSubmissions(nextProps.submissions.data.submissions);
    }
  }
  componentWillMount(){
    this.props.getSubmissions(this.props.user['_brokerId']);
  }

  loadSubmissions(submissionsArray){
    console.log("TEST456 SUBMISSIONS ARRAY", submissionsArray);
    let list = [];

    for (let item of submissionsArray){     
      const premiumType = item[`${item.type}Premium`];
      const totalCost = premiumType ? (premiumType.totalCost) : '';
      list.push({
        ...item,
        primaryNamedInsured: item.primaryNamedInsured,
        totalCost: premiumType ? formatDollars(premiumType.totalCost) : '',
        quotedPremium: premiumType ? formatDollars(premiumType.quotedPremium) : '',
        totalPremium: premiumType ? formatDollars(premiumType.totalPremium) : '',
        type: item.type,
        dateCreated: Moment(item.createdAt).format( 'MM/DD/YYYY')

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

    console.log('TEST456 chartData', this.state.chartData)

    if(!this.props.submissions.data){
      return (<div>Loading submissions...</div>);
    }
    let submissions = this.props.submissions.data.submissions;

    submissions = submissions.sort(function(a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
    
    const list = submissions.map((submission, key)=>{
      const premiumType = submission[`${submission.type}Premium`];
      return (
        <tr key={key}>
          <td>{submission.primaryNamedInsured}</td>
          <td>{premiumType && formatDollars(premiumType.quotedPremium)}</td>
          <td>{premiumType && formatDollars(premiumType.totalCost)}</td>
          <td>{premiumType && formatDollars(premiumType.totalPremium)}</td>
          <td>{submission.type}</td>
          <td>{Moment(submission.createdAt).format('MMMM Do YYYY')}</td>
          <td onClick={()=> this.goToPage(submission)} className="link">Edit</td>
        </tr>
      );
    });
    return (
      <div>
      
      <h3>Your submissions</h3>
      <table className="u-full-width">
          <thead>
            <tr>
              <th>Primary Named Insured</th>
              <th>Quoted Premium</th>
              <th>Total Cost</th>
              <th>Total Premium</th>
              <th>Type</th>
              <th>Date Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
        <BootstrapTable
          data={this.state.chartData}
          hover={true}
          condensed={true}
          pagination={true}
          search
          multiColumnSearch
          >
          <TableHeaderColumn
            dataField="_id"
            isKey={true}
            width="50px"
            hidden
            ></TableHeaderColumn>
          <TableHeaderColumn
            dataField="primaryNamedInsured"
            dataSort={true}
            width="100px"
            >Primary Named Insured</TableHeaderColumn>
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
                width="20px"
                dataField="id"
                dataFormat={ selectFormatter }
                ></TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user.state.user,
    submissions: state.submissions
  };
}

export default connect(mapStateToProps, actions)(Home);
