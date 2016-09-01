import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import moment from 'moment';

import SearchBar from 'components/shared/SearchBar';
import ListTable from 'components/shared/ListTable';
import Paginator from 'components/shared/Paginator';

function PowerConsole(props, context) {
  const {
    content
  } = context;

  let pageIndex = 1;
  let pageCountPerPage = 5;

  let query = '';
  let queryTotal = 0;

  let data = [
    {date: moment().format('MMMM Do YYYY, h:mm:ss a'), isApproved: 'Yes'},
    {date: moment().format('MMMM Do YYYY, h:mm:ss a'), isApproved: 'No'}
  ];

  let columns = [
    {key: 'date', value: 'Date'}, 
    {key: 'isApproved', value: 'Approved?'}];
  
  return (
    <div className='powerconsole'>
      <Helmet title={content.title} />
      <SearchBar pageIndex={pageIndex} pageCountPerPage={pageCountPerPage} query={query} queryTotal={queryTotal} data={data} />
      <ListTable pageIndex={pageIndex} pageCountPerPage={pageCountPerPage} query={query} queryTotal={queryTotal} data={data} columns={columns} />
      <Paginator pageIndex={pageIndex} pageCountPerPage={pageCountPerPage} query={query} queryTotal={queryTotal} data={data} />
    </div>
  );
}

PowerConsole.contextTypes = {
  config: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired
};

export default PowerConsole;
