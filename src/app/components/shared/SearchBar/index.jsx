import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles'

class SearchBar extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.pageIndex         !== nextProps.pageIndex || 
           this.props.pageCount         !== nextProps.pageCount ||
           this.props.pageCountPerPage  !== nextProps.pageCountPerPage ||
           this.props.query             !== nextProps.query || 
           this.props.queryTotal        !== nextProps.queryTotal ||
           this.props.data              !== nextProps.data;
  }

  render() {
    const {
      pageIndex,
      pageCount,
      pageCountPerPage,
      query,
      queryTotal,
      ...rest } = this.props;
    
    return (
      <div
        className="searchBar"
        { ...rest }
      >
        <input className="query" type="text" value={ query || ''} />
        <button className="go">Search</button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  // query: PropTypes.optionalString
};

export default SearchBar;
