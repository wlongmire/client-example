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
      pageCount: 5,
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

  handlePaginator(ev)
  {
    let savedIndex = parseInt(this.state.pageIndex);
    let index = parseInt(ev.target.dataset.pageIndex);
    
    if (savedIndex !== index) {
      this.state.pageIndex = index;
      this.setState({
        pageIndex: index
      });

      this.loadData();
    }
  }

  handlePaginatorPrevious()
  {
    let savedIndex = parseInt(this.state.pageIndex);
    let previousIndex = parseInt(this.state.pageIndex) - 1 > 1 ? 
                          parseInt(this.state.pageIndex) - 1 : 
                          1;
    
    if (savedIndex !== previousIndex) {
      this.setState({
        pageIndex: previousIndex
      });
      this.loadData();
    }
  }

  handlePaginatorNext()
  {
    let savedIndex = parseInt(this.state.pageIndex);
    let nextIndex = parseInt(this.state.pageIndex) + 1 <= parseInt(this.state.pageCount) ? 
                      parseInt(this.state.pageIndex) + 1 : 
                      parseInt(this.state.pageCount);
    
    if (savedIndex !== nextIndex) {
      this.setState({
        pageIndex: nextIndex
      });

      this.loadData();
    }
  }

  render() {
    
    let self = this;

    return (
      <div className='powerconsole'>
        <Helmet title={this.state.content.title} />
        <SearchBar pageIndex={this.state.pageIndex} pageCount={this.state.pageCount} pageCountPerPage={this.state.pageCountPerPage} query={this.state.query} queryTotal={this.state.queryTotal} data={this.state.data} />
        <ListTable pageIndex={this.state.pageIndex} pageCount={this.state.pageCount} pageCountPerPage={this.state.pageCountPerPage} query={this.state.query} queryTotal={this.state.queryTotal} data={this.state.data} columns={this.state.columns} />
        { this.state.pageCount > 1 ? 
          <Paginator 
            onClick={this.handlePaginator.bind(self)} 
            handlePrevious={this.handlePaginatorPrevious.bind(self)} 
            handleNext={this.handlePaginatorNext.bind(self)}
            pageIndex={this.state.pageIndex} 
            pageCount={this.state.pageCount} 
            pageCountPerPage={this.state.pageCountPerPage} 
            query={this.state.query} 
            queryTotal={this.state.queryTotal} 
            data={this.state.data} />
            : '' 
        }
      </div>
    );
  }

  componentDidMount() {
      this.loadData();
  }

  loadData() {
    
    let token = localStorage.getItem('token');
    let self = this;
    
    return fetch(baseURL + '/um/listSubmissions?' 
      + 'pageCountPerPage=' + encodeURIComponent(this.state.pageCountPerPage)
      + 'pageIndex=' + encodeURIComponent(this.state.pageIndex)
      + 'query=' + encodeURIComponent(this.state.query),
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-token': token
      }
    })
    .then(res => {
      // Authorization HTTP status codes
      if (res.status > 400) {
        // Session expired
        if (res.status == 401) {
          // Go back to sign in.
          return self.props.dispatch(push({
            pathname: '/'
          }));
        }

        // Insufficient permission(s)
        if (res.status == 403) {
          // @TODO handle insufficient permissions status
        }
        
      }

      return res.json();
    })
    .then((data) => {
      
      if (!data.success) return Promise.reject(data.message);

      // Update the auth token.
      // @TODO switch to auth and refresh token model
      localStorage.setItem('token', data.authToken);
      
      this.setState({
        pageCount: data.pageCount,
        data: data.submissions
      });
      
      Promise.resolve(true);
    })
    .catch((error) => {
      return Promise.reject({ _error: error.message });
    });
  }
};

export default connect()(PowerConsole);
