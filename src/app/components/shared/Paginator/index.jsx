import React, { Component, PropTypes } from 'react';

import { onlyDomProps } from 'app/utils/reduxForm';

class Paginator extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.pageIndex         !== nextProps.pageIndex || 
           this.props.pageCountPerPage  !== nextProps.pageCountPerPage ||
           this.props.query             !== nextProps.query || 
           this.props.queryTotal        !== nextProps.queryTotal ||
           this.props.data              !== nextProps.data;
  }

  render() {
    const {
      pageIndex,
      pageCountPerPage,
      query,
      queryTotal,
      ...rest } = this.props;
    
    return (
      <div
        
        { ...rest }
      >
        <button>Previous</button>
        <ul>
          <li><button>1</button></li>
        </ul>
        <button>Next</button>
      </div>
    );
  }
}

Paginator.propTypes = {
  // query: PropTypes.object.isRequired
};

export default Paginator;
