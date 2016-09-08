import React, { Component, PropTypes } from 'react';
import styles from './styles';

class SearchBar extends Component {
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