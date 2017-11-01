import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Row, Col, Button, Alert, Fade } from 'react-bootstrap'

import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { getUsersByBrokerage, deleteUser, resendPasswordUser, setAlert, updateUser, createNewUser } from './../../actions/adminActions'

import TableComponent from './../../components/shared/TableComponent'
import ToggleDisplay from './../../components/shared/ToggleDisplay'
import DialogBox from './../../components/shared/DialogBox'
import EditUserModal from './EditUserModal'
import NewUser from './NewUser'

export class UserManagement extends Component {
  constructor() {
    super()
    this.state = {
      showEditModal: false
    }

    this.handleDisableUser = this.handleDisableUser.bind(this)
    this.handleEnableUser = this.handleEnableUser.bind(this)
    this.handleAutoClose = this.handleAutoClose.bind(this)
    this.handleCreateUser = this.handleCreateUser.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.handleResendUser = this.handleResendUser.bind(this)
    this.handleEditUser = this.handleEditUser.bind(this)
    this.hideEditModal = this.hideEditModal.bind(this)
  }
  componentWillMount() {
    if (this.props.user && this.props.user.role !== 'admin') {
      browserHistory.push('/submissions')
    } else {
      this.props.dispatch(getUsersByBrokerage(this.props.user))
    }

    this.closeAlert = this.closeAlert.bind(this)
  }

  closeAlert() {
    this.props.dispatch(setAlert({ show: false, message: '', bsStyle: '' }))
  }

  hideEditModal() {
    this.setState({
      ...this.state,
      showEditModal: false,
      selectedUser: null
    })
  }

  handleAutoClose() {
    // setTimeout(this.closeAlert, 5000)
  }

  handleDisableUser(row) {
    this.props.dispatch(updateUser(row, 'disabled', this.props.user))
    this.handleAutoClose()
  }

  handleEnableUser(row) {
    this.props.dispatch(updateUser(row, 'active', this.props.user))
    this.handleAutoClose()
  }

  handleEditUser(row) {
    this.setState({
      ...this.state,
      showEditModal: true,
      selectedUser: row
    })
  }

  handleCreateUser(email, isAdmin) {
    const user = this.props.user
    this.props.dispatch(
      createNewUser(email, isAdmin, user)
    )

    this.handleAutoClose()
  }

  handleDeleteUser(id) {
    const user = this.props.user
    this.props.dispatch(
      deleteUser(id, user)
    )
    this.handleAutoClose()
  }

  handleResendUser(sendUser) {
    const user = this.props.user
    this.props.dispatch(
      resendPasswordUser(sendUser, user)
    )
    this.handleAutoClose()
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
          isSortable: true // ,
          // *** sorting keeps getting messed up so I am disabling this -AK
          // sortFunc: (a, b, order) => {
          //   if (a.username === user.username) {
          //     return -1
          //   } else if (order === 'asc') {
          //     return a.email.localeCompare(b.email)
          //   } else {
          //     return b.email.localeCompare(a.email)
          //   }
          // }
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
                  <Button onClick={() => { return this.handleEditUser(row) }} >Edit</Button>
                  <Button onClick={() => { return this.handleDisableUser(row) }}>Disable</Button>
                </div>)
              } else if (row.status === 'disabled') {
                return (<div className="updateColumn">
                  <Button onClick={() => { return this.handleEditUser(row) }}>Edit</Button>
                  <Button onClick={() => { return this.handleEnableUser(row) }}>Enable</Button>
                </div>)
              }
              return (<div />)
            }

            return result()
          }
        }
      ]
    }

    const pendingUsers = {
      data: this.props.pendingUsers,
      columns: [
        { dataField: 'email', width: '35%', isKey: true, title: 'Email', isSortable: true },
        { dataField: 'admin', width: '20%', isKey: false, title: 'Admin',
          dataFormat: (cell, row) => {
            return ((row.role === 'admin') ? 'Yes' : '')
          }
        },
        { isKey: false,
          title: 'Invited',
          dataFormat: (cell, row) => (
            moment(row.dateCreated).format('MM/DD/YY')
          )
        },
        { isKey: false,
          title: 'invitedHiddenSort',
          hidden: true,
          dataField: 'dateCreated'
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

    // console.log('this.props.pendingUsers', this.props.pendingUsers)
    // console.log('activeUsers.data.', activeUsers.data)
    // console.log('user.email', user.email)
    // console.log('user', user)

    // // const activeUsersSorted = () => {
    // //   activeUsers.data.sort((a, b) => { return +(!b.username.localeCompare(user.username))
    // // }).sort((a,b) => {

    // // })

    return (
      <div className="userManagement routeContainer">
        <Fade in={this.props.alertDisplay.show} timeout={4000}>
          <Alert bsStyle={this.props.alertDisplay.bsStyle} onDismiss={this.closeAlert}>
            { this.props.alertDisplay.message }
          </Alert>
        </Fade>

        <h3>Manage Users</h3>
        <div>
          <Row>
            <Col xs={12} sm={10} md={4} lg={4}>
              <Col xs={12}>

                <NewUser
                  broker={user.brokerName}
                  handleCreateUser={this.handleCreateUser}
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
                    options={{ defaultSortName: 'dateCreated', defaultSortOrder: 'desc' }}
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
                    data={activeUsers.data.sort((a, b) => { return +(!b.username.localeCompare(user.username)) })}
                    columns={activeUsers.columns}
                  />
                </Col>
              </Row>

            </Col>

          </Row>
        </div>
        <DialogBox
          title="Edit User"
          custom_class="editModal"
          show={this.state.showEditModal}
        >
          <EditUserModal
            selectedUser={this.state.selectedUser}
            loggedInUser={this.props.user}
            hideEditModal={this.hideEditModal}
          />
        </DialogBox>

      </div>
    )
  }
}

UserManagement.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  pendingUsers: PropTypes.array,
  activeUsers: PropTypes.array,
  showEditModal: PropTypes.bool,
  alertDisplay: PropTypes.object
}

export default connect((store) => {
  const { users, alertDisplay } = store.admin

  return {
    user: store.user,
    alertDisplay,
    showEditModal: true,
    pendingUsers: users.filter(user => (user.status === 'pending')),
    activeUsers: users.filter(user => (user.status === 'active' || user.status === 'disabled'))
  }
})(UserManagement)