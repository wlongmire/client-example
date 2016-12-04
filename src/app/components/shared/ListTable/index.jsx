import React, { Component, PropTypes } from 'react';
import styles from './styles';

class ListTable extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.pageIndex         !== nextProps.pageIndex || 
           this.props.pageCount         !== nextProps.pageCount ||
           this.props.pageCountPerPage  !== nextProps.pageCountPerPage ||
           this.props.query             !== nextProps.query || 
           this.props.queryTotal        !== nextProps.queryTotal ||
           this.props.data              !== nextProps.data;
  }

  render() {

    // if (!this.props.columns) {
    //   this.props.columns = ['Results'];
    // }
    const {
      columns,
      pageIndex,
      pageCount,
      pageCountPerPage,
      query,
      queryTotal,
      data,
      ...rest } = this.props;
    
    
    return (
      <div
        
        { ...rest }
      >
        <table className="listTable">
          <thead>
            <tr>
            {[...columns].map((col, colIndex) => 
              <th key={colIndex} data-key={col.key} className={'header header-' + col.key}>{col.value}</th>
            )}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ?

              [...data].map((datum, row) => 
                <tr key={row} className="dataRow">
                  
                  {[...columns].map((col, colIndex) => 
                    <td key={colIndex} data-key={col.key}>{col.postProcessor ? col.postProcessor(datum[col.key]) : datum[col.key]}</td>
                  )}
                </tr>
              )
            :
            <tr>
              <td className="noResultsCell" colSpan={columns.length}>(No Results)</td>
            </tr>
            }
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
