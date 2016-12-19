import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import ContractorsForm from 'components/ContractorsForm';

function Contractors(props, context) {
  const {
    content
  } = context;
  return (
    <div className='home'>
      <Helmet title={content.title} />
      <ContractorsForm />
    </div>
  );
}

Contractors.contextTypes = {
  config: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired
};

export default Contractors;