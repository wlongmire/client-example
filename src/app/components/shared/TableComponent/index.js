import React from 'react'
import PropTypes from 'prop-types'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'

function TableComponent(props) {
  const options = Object.assign(
    {},
    props.options
  )

  const updateOptions = (cell, row) => {
    return (<div className="updateColumn">
      <Button>Edit</Button>
      <Button>Cancel</Button>
    </div>)
  }

  const columns = [
    {
      dataField: 'email',
      width: '35%',
      isKey: false,
      title: 'Email'
    },
    {
      dataField: 'admin',
      width: '20%',
      isKey: false,
      title: 'Admin'
    },
    {
      dataField: 'lastOnline',
      isKey: false,
      title: 'Last Online'
    },
    {
      width: '176px',
      dataFormat:updateOptions,
      title: 'Update'
    }
  ]
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
          {{
            generateColumns(columns)
          }}
        </BootstrapTable>
      </div>
    </div>
  )
}

TableComponent.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.object,
  data: PropTypes.array
}

export default TableComponent