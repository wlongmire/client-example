import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Row, Col, Button, Alert } from 'react-bootstrap'

import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { getUsersByBrokerage, deleteUser, resendPasswordUser, setAlert, updateUser } from './../../actions/adminActions'

import TableComponent from './../../components/shared/TableComponent'
import ToggleDisplay from './../../components/shared/ToggleDisplay'
import NewUser from './NewUser'

export class UserManagement extends Component {
  constructor() {
    super()

    this.disableUser = this.disableUser.bind(this)
    this.enableUser = this.enableUser.bind(this)
  }
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

  disableUser(row) {
    this.props.dispatch(updateUser(row, 'disabled', this.props.user))
  }

  enableUser(row) {
    this.props.dispatch(updateUser(row, 'active', this.props.user))
  }

  handleDeleteUser(id) {
    const user = this.props.user
    this.props.dispatch(
      deleteUser(id, user)
    )
  }

  handleResendUser(sendUser) {
    const user = this.props.user
    this.props.dispatch(
      resendPasswordUser(sendUser, user)
    )
  }

  render() {
    const user = this.props.user
    const activeUsers = {
      data: this.props.activeUsers,
      columns: [
        { dataField: 'email',
          width: '35%',
          isKey: true,
          title: 'Email',
          isSortable: true,
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
        { dataField: 'admin',
          width: '10%',
          title: 'Admin',
          dataFormat: (cell, row) => {
            return ((row.role === 'admin') ? 'Yes' : '')
          }
        },
        { isKey: false,
          title: 'Last Online',
          width: '130px',
          dataFormat: (cell, row) => (
            moment(row.lastOnline).format('MM/DD/YY h:mm a')
          )
        },
        { dataField: 'status',
          width: '10%',
          title: 'Active',
          dataFormat: (cell, row) => {
            return ((row.status === 'active') ? (<div className="activeStatus">Active</div>) : (<div className="disabledStatus">Disabled</div>))
          } },
        { width: '140px',
          title: 'Update',
          dataFormat: (cell, row) => {
            const result = () => {
              if (user.id === row.id) {
                return (<div />)
              } else if (row.status === 'active') {
                return (<div className="updateColumn">
                  <Button>Edit</Button>
                  <Button onClick={() => { return this.disableUser(row) }}>Disable</Button>
                </div>)
              } else if (row.status === 'disabled') {
                return (<div className="updateColumn">
                  <Button>Edit</Button>
                  <Button onClick={() => { return this.enableUser(row) }}>Enable</Button>
                </div>)
              }
              return (<div />)
            }

            return result()
          }
        }
      ]
    }

    console.log('this.props.pendingUsers', this.props.pendingUsers)
    const pendingUsers = {
      data: this.props.pendingUsers,
      columns:[
        { dataField: 'email', width: '35%', isKey: true, title: 'Email' },
        { dataField: 'admin', width: '20%', isKey: false, title: 'Admin',
          dataFormat: (cell, row) => {
            return ((row.role === 'admin') ? 'Yes':'')
          }
        },
        { isKey: false,
          title: 'Invited',
          dataFormat: (cell, row) => (
            moment(row.invitedOn).format('MM/DD/YY')
          )
        },
        { width: '176px',
          isKey: false,
          title: 'Update',
          dataFormat: (cell, row) => {
            return (<div className="updateColumn">
              <Button onClick={
                ()=>{
                  this.handleResendUser(row)
                }
            }>Resend</Button>
              <Button onClick={
                ()=>{
                  this.handleDeleteUser(row.id)
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
                    data={ pendingUsers.data.sort((a, b) => { return moment.utc(b.dateCreated).diff(moment.utc(a.dateCreated)) })}
                    columns={pendingUsers.columns}
                    options={{
                      sizePerPage: 10,
                      pageStartIndex: 1,
                      paginationSize: 3
                    }}
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
  activeUsers: PropTypes.array,
  alertDisplay: PropTypes.object
}

export default connect((store) => {
  const { users, alertDisplay } = store.admin

  return {
    user: store.user,
    alertDisplay,
    pendingUsers: users.filter(user => (user.status === 'pending')),
    activeUsers: users.filter(user => (user.status === 'active' || user.status === 'disabled'))
  }
})(UserManagement)

