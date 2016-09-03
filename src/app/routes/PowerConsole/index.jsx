import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import moment from 'moment';
import 'moment-timezone';

import fetch from 'isomorphic-fetch';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import config from '../../../config';

import SearchBar from 'components/shared/SearchBar';
import ListTable from 'components/shared/ListTable';
import Paginator from 'components/shared/Paginator';

let baseURL = config.apiserver.url + (config.apiserver.port ? ':' + config.apiserver.port : '');

const formatToNiceDate = function (value) {
  return moment(value, moment.ISO_8601).tz('America/New_York').format('MMM Do YYYY, h:mm:ss a z');
}

class PowerConsole extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: {
        title: 'Power Console'
      },
      pageIndex: 1,
      pageCountPerPage: 5,
      query: '',
      queryTotal: 0,
      data: [],
      columns: [
        {key: 'createdAt', value: 'Date', postProcessor: formatToNiceDate},
        {key: 'primaryNamedInsured', value: 'Primary Named Insured'},
        {key: 'status', value: 'Status'}
      ]
    };
  }
  render() {
    
    let state = this.state;

    return (
      <div className='powerconsole'>
        <Helmet title={state.content.title} />
        <SearchBar pageIndex={state.pageIndex} pageCountPerPage={state.pageCountPerPage} query={state.query} queryTotal={state.queryTotal} data={state.data} />
        <ListTable pageIndex={state.pageIndex} pageCountPerPage={state.pageCountPerPage} query={state.query} queryTotal={state.queryTotal} data={state.data} columns={state.columns} />
        <Paginator pageIndex={state.pageIndex} pageCountPerPage={state.pageCountPerPage} query={state.query} queryTotal={state.queryTotal} data={state.data} />
      </div>
    );
  }

  componentDidMount() {
    
    return fetch(baseURL + '/um/listSubmissions', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((res) => {

      if (!res.success) return Promise.reject(res.message);

      this.setState({
        data: res.submissions
      });
      
      Promise.resolve(true);
    })
    .catch((error) => {
      return Promise.reject({ _error: error.message });
    });
  }

  // contextTypes: {
  //   config: React.PropTypes.object.isRequired,
  //   content: React.PropTypes.object.isRequired
  // },
  // getInitialState() {
  //     return {
  //       content: {
  //         title: 'Power Console'
  //       },
  //       pageIndex: 1,
  //       pageCountPerPage: 5,
  //       query: '',
  //       queryTotal: 0,
  //       data: [
  //         {date: moment().format('MMMM Do YYYY, h:mm:ss a'), isApproved: 'Yes'},
  //         {date: moment().format('MMMM Do YYYY, h:mm:ss a'), isApproved: 'No'}
  //       ],
  //       columns: [
  //         {key: 'date', value: 'Date'}, 
  //         {key: 'isApproved', value: 'Approved?'}
  //       ]
  //     };
  // }
};

export default connect()(PowerConsole);
