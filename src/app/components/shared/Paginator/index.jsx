import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styles from './styles';

class Paginator extends Component {

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
      pageCountPerPage,
      pageCount,
      query,
      queryTotal,
      ...rest } = this.props;
    let pageButtons = [];

    const generatePageButtons = () => {
      let result;

      pageButtons = [];

      for (let i = 1; i <= pageCount; i++) {
        pageButtons.push(
          <li key={'page_' + i} className={i==pageIndex ? 'selected' : ''}>
            <button data-page-index={i} onClick={this.props.onClick}>{i}</button>
          </li>
        );
      }
    };

    generatePageButtons();

    return (
      <div className="paginator">
        <div className="paginator__container">
          <button onClick={this.props.handlePrevious}>Previous</button>
          <div className="paginator__list_container">

            <ul>
              {
                pageButtons
              }
            </ul>
          </div>
          <button onClick={this.props.handleNext}>Next</button>
        </div>
      </div>
    );
  }
}

Paginator.propTypes = {
  // query: PropTypes.object.isRequired
};

export default connect()(Paginator);
