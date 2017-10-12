import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Row, Col, Button, Alert } from 'react-bootstrap'

import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { getUsersByBrokerage, deleteUser, setAlert } from './../../actions/adminActions'

import TableComponent from './../../components/shared/TableComponent'
import ToggleDisplay from './../../components/shared/ToggleDisplay'
import NewUser from './NewUser'

export class UserManagement extends Component {
  componentWillMount() {
    if (this.props.user && this.props.user.role !== 'admin') {
      browserHistory.push('/submissions')
    } else {
      this.props.dispatch(getUsersByBrokerage(this.props.user))
    }

    this.closeAlert = this.closeAlert.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
  }

  closeAlert() {
    this.props.dispatch(setAlert({ show: false, message: '', bsStyle: '' }))
  }

  handleDeleteUser() {
    const user = this.props.user
    this.props.dispatch(
      deleteUser('f6a40e89-d1be-49d8-8445-d25cc9bfe6e8', user)
    )
  }

  render() {
    const user = this.props.user
    const activeUsers = {
      data: this.props.activeUsers,
      columns: [
        { dataField: 'email', width: '35%', isKey: true, title: 'Email', isSortable: true,
          sortFunc: (a, b, order) => {
            if (a.id === user.id) {
              return -1
            } else if (order === 'desc') {
              return a.email.localeCompare(b.email)
            } else {
              return b.email.localeCompare(a.email)
            }
          } 
        },
        { dataField: 'admin', width: '20%', title: 'Admin',
          dataFormat: (cell, row) => {
            return ((row.role === 'admin')?'Yes':'')
          }
        },
        { isKey: false, title: 'Last Online',
          dataFormat:(cell, row)=>(
            moment(row.lastOnline).format('MM/DD/YY h:mm a')
          )
        },
        { width: '176px', title: 'Update',
          dataFormat: (cell, row) => {
            const result = (user.id !== row.id) ? (<div className="updateColumn">
              <Button>Edit</Button>
              <Button>Disable</Button>
            </div>) : <div />

            return result
          }
        }
      ]
    }

    const pendingUsers = {
      data: this.props.pendingUsers,
      columns:[
        { dataField: 'email', width: '35%', isKey: true, title: 'Email', isSortable: true },
        { dataField: 'admin', width: '20%', isKey: false, title: 'Admin',
          dataFormat: (cell, row) => {
            return ((row.role === 'admin') ? 'Yes' : '')
          }
        },
        { isKey: false, title: 'Invited',
          dataFormat:(cell, row)=>(
            moment(row.invitedOn).format('MM/DD/YY')
          )
        },
        { width: '176px', isKey: false, title: 'Update',
          dataFormat:(cell, row) => {
            return (<div className="updateColumn">
              <Button>Resend</Button>
              <Button onClick={
                ()=>{
                  console.log(row)
                  // this.handleDeleteUser(row.id)
                }
            }>Cancel</Button>
            </div>)
          },
        }
      ]
    }

    return (
      <div className="userManagement routeContainer">
        <ToggleDisplay
          show={this.props.alertDisplay.show}
          render={
            () => (
              <Alert bsStyle={this.props.alertDisplay.bsStyle} onDismiss={this.closeAlert}>
                { this.props.alertDisplay.message }
              </Alert>)
          }
        />

        <h3>Manage Users</h3>
        <div>
          <Row>
            <Col xs={12} sm={10} md={4} lg={4}>
              <Col xs={12}>

                <NewUser
                  broker={user.brokerName}
                />
              </Col>
            </Col>

            <Col xs={12} sm={10} md={8} lg={8}>
              <Row>
                <Col xs={12}>
                  <TableComponent
                    title="Pending invites"
                    data={pendingUsers.data}
                    columns={pendingUsers.columns}
                    options={{}}
                  />
                </Col>
                <Col xs={12}>
                  <TableComponent
                    title={`${user.brokerName} users`}
                    options={{
                      sizePerPage: 5,
                      pageStartIndex: 1,
                      paginationSize: 3,
                      defaultSortName: 'email',
                      defaultSortOrder: 'asc'
                    }}
                    data={activeUsers.data.sort((a, b) => { return +(!b.id.localeCompare(user.id)) })
}
                    columns={activeUsers.columns}
                  />
                </Col>
              </Row>

            </Col>

          </Row>
        </div>
      </div>
    )
  }
}

UserManagement.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  pendingUsers: PropTypes.array,
  activeUsers: PropTypes.array
}

export default connect((store) => {
  const { users, alertDisplay } = store.admin

  return {
    user: store.user,
    alertDisplay,
    pendingUsers: users.filter(user => (user.status === 'pending')),
    activeUsers: users.filter(user => (user.status === 'active'))
  }
})(UserManagement)