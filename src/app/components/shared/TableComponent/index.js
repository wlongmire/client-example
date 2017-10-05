import React from 'react'
import moment from 'moment'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'

function TableComponent(props) {
  const options = {
    sizePerPage: 5,
    pageStartIndex: 1, // where to start counting the pages
    paginationSize: 3,  // the pagination bar size.
  }

  const updateOptions = (cell, row) => {
    return (<div className="updateColumn">
      <Button>Edit</Button>
      <Button>Cancel</Button>
    </div>)
  }

  const date = moment(Date()).format('MM-YYYY-DD HH:mm')
  
  const data = [
    { email: 'warrenlongmire@gmail.com', admin: 'Yes', lastOnline: date },
    { email: 'warrenlongmire@gmail.com', admin: '', lastOnline: date },
    { email: 'warrenlongmire@gmail.com', admin: 'Yes', lastOnline: date },
    { email: 'warrenlongmire@gmail.com', admin: 'Yes', lastOnline: date },
    { email: 'warrenlongmire@gmail.com', admin: 'Yes', lastOnline: date },
    { email: 'warrenlongmire@gmail.com', admin: 'Yes', lastOnline: date },
    { email: 'warrenlongmire@gmail.com', admin: 'Yes', lastOnline: date },
    { email: 'warrenlongmire@gmail.com', admin: 'Yes', lastOnline: date },
    { email: 'warrenlongmire@gmail.com', admin: 'Yes', lastOnline: date },
    { email: 'warrenlongmire@gmail.com', admin: 'Yes', lastOnline: date }
  ]


  return (
    <div className="tableComponent">
      <h1>{props.title}</h1>
      
      <div className="table">
        <input type="text" name="search" className="searchInput"/>
        <BootstrapTable
          data={data}
          bordered={false}
          options={options}
          pagination
          multiColumnSearch
        >
          <TableHeaderColumn
            dataField="email"
            width="35%"
            isKey={true}
          >Email</TableHeaderColumn>

          <TableHeaderColumn
            dataField="admin"
            width="20%"
          >Admin</TableHeaderColumn>

          <TableHeaderColumn
            dataField="lastOnline"
          >Last Online</TableHeaderColumn>

          <TableHeaderColumn
            dataFormat={updateOptions}
            className="update"
            width="176px"
          >
            Update</TableHeaderColumn>
        </BootstrapTable>
      </div>
    </div>
  )
}

export default TableComponent