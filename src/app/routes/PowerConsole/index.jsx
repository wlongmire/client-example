import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import SearchBar from 'components/shared/SearchBar';
import ListTable from 'components/shared/ListTable';
import Paginator from 'components/shared/Paginator';

function PowerConsole(props, context) {
  const {
    content,
    pageIndex,
    pageCountPerPage,
    query,
    queryTotal,
    data
  } = context;

  context.query = '';
  
  return (
    <div className='powerconsole'>
      <Helmet title={content.title} />
      <SearchBar pageIndex={pageIndex} pageCountPerPage={pageCountPerPage} query={query} queryTotal={queryTotal} data={data} />
      <ListTable pageIndex={pageIndex} pageCountPerPage={pageCountPerPage} query={query} queryTotal={queryTotal} data={data} />
      <Paginator pageIndex={pageIndex} pageCountPerPage={pageCountPerPage} query={query} queryTotal={queryTotal} data={data} />
    </div>
  );
}

PowerConsole.contextTypes = {
  config: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired
};

export default PowerConsole;
