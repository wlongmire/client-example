import React, { Component, PropTypes } from 'react';
import styles from './styles';

class ListTable extends Component {
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
        <table className="listTable">
          <tbody>
            <tr>
              <td>(No Results)</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

ListTable.propTypes = {
  // query: PropTypes.string.isRequired,
  // data: PropTypes.object.isRequired
};

export default ListTable;
