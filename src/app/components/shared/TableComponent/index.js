import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

function TableComponent(props) {
  const options = {
    defaultSortName: 'updatedAt',
    defaultSortOrder: 'desc'
  }
  const data = []

  return (
    <div className="tableComponent">
      <h1>{props.title}</h1>
      <BootstrapTable
        data={data}
        condensed={true}
        options={options}
        search
        pagination
        multiColumnSearch
      >
        <TableHeaderColumn
          dataField="_id"
          isKey={true}
          hidden
        />
        <TableHeaderColumn
          dataField="updatedAt"
          hidden
        />
        <TableHeaderColumn
          dataField="primaryInsuredName"
          dataSort={true}
          width="100px"
        >Primary Named Insured</TableHeaderColumn>
      </BootstrapTable>
    </div>
  )
}

export default TableComponent