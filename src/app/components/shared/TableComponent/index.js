import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

function generateColumns(columns) {
  return columns.map((col) => {
    return <TableHeaderColumn
      key={uuid.v1()}
      dataField={col.dataField}
      width={col.width}
      isKey={col.isKey}
      dataFormat={col.dataFormat}
      >{col.title}
    </TableHeaderColumn>
  })
}

function TableComponent(props) {
  const options = Object.assign(
    {
      sizePerPageList: []
    },
    props.options
  )

  return (
    <div className="tableComponent">
      <h1>{props.title}</h1>
      
      <div className="table">
        {/* <input type="text" name="search" className="searchInput"/> */}
        <BootstrapTable
          data={props.data}
          bordered={false}
          options={options}
          pagination={true}
          search
          multiColumnSearch
        >
          { generateColumns(props.columns) }
        </BootstrapTable>
      </div>
    </div>
  )
}

TableComponent.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  options: PropTypes.object,
  data: PropTypes.array,
  
}

export default TableComponent