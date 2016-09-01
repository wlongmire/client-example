import React, { Component, PropTypes } from 'react';
import styles from './styles';

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
      <div className="paginator"
        
        { ...rest }
      >
        <div className="paginator__container">
          <button>Previous</button>
          <div className="paginator__list_container">
            <ul>
              <li><button>1</button></li>
              <li><button>2</button></li>
              <li><button>3</button></li>
            </ul>
          </div>
          <button>Next</button>
        </div>
      </div>
    );
  }
}

Paginator.propTypes = {
  // query: PropTypes.object.isRequired
};

export default Paginator;
