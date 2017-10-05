import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Row, Col, Button } from 'react-bootstrap'

import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { getUsersByBrokerage } from './../../actions/adminActions'
import TableComponent from './../../components/shared/TableComponent'

export class UserManagement extends Component {
  componentDidMount() {
    if (this.props.user && this.props.user.role !== 'admin') {
      browserHistory.push('/submissions')
    } else {
      this.props.dispatch(getUsersByBrokerage(this.props.user))
    }
  }

  render() {
    const user = this.props.user
    const date = moment(Date()).format('MM/DD/YY HH:mm')
    
    const activeUsers = {
      data: [
        { id: '1231', email: 'warrenlongmire@gmail.com', role: 'broker', lastOnline: date, invitedOn: date },
        { id: '1231', email: 'warrenlongmire@gmail.com', role: 'admin', lastOnline: date, invitedOn: date },
        { id: '1231', email: 'warrenlongmire@gmail.com', role: 'broker', lastOnline: date, invitedOn: date },
        { id: '1231', email: 'warrenlongmire@gmail.com', role: 'admin', lastOnline: date, invitedOn: date },
        { id: '1231', email: 'warrenlongmire@gmail.com', role: 'admin', lastOnline: date, invitedOn: date },
        { id: '1231', email: 'warrenlongmire@gmail.com', role: 'admin', lastOnline: date, invitedOn: date },
        { id: '1231', email: 'warrenlongmire@gmail.com', role: 'admin', lastOnline: date, invitedOn: date },
        { id: '1231', email: 'warrenlongmire@gmail.com', role: 'admin', lastOnline: date, invitedOn: date },
        { id: '1231', email: 'warrenlongmire@gmail.com', role: 'admin', lastOnline: date, invitedOn: date },
        { id: '1231', email: 'warrenlongmire@gmail.com', role: 'admin', lastOnline: date, invitedOn: date },
        { id: '1231', email: 'warrenlongmire@gmail.com', role: 'admin', lastOnline: date, invitedOn: date },
        { id: '1231', email: 'warrenlongmire@gmail.com', role: 'admin', lastOnline: date, invitedOn: date }
      ],
      columns: [
        { dataField: 'email', width: '35%', isKey: true, title: 'Email' },
        { dataField: 'admin', width: '20%', isKey: false, title: 'Admin',
          dataFormat: (cell, row) => {
            return ((row.role === 'admin')?'Yes':'')
          } 
        },
        { dataField: 'lastOnline', isKey: false, title: 'Last Online' },
        { width: '176px',isKey: false, title: 'Update',
          dataFormat:(cell, row) => {
            return (<div className="updateColumn">
              <Button>Edit</Button>
              <Button>Disable</Button>
            </div>)
          }
        }
      ]
    }

    const pendingUsers = {
      data:[
        { id: '1231', email: 'this@gmail.com', role: 'admin', lastOnline: date, invitedOn: date },
        { id: '1231', email: 'this@gmail.com', role: 'broker', lastOnline: date, invitedOn: date },
        { id: '1231', email: 'this@gmail.com', role: 'admin', lastOnline: date, invitedOn: date }
      ],
      columns:[
        { dataField: 'email', width: '35%', isKey: true, title: 'Email' },
        { dataField: 'admin', width: '20%', isKey: false, title: 'Admin',
          dataFormat: (cell, row) => {
            return ((row.role === 'admin')?'Yes':'')
          }
        },
        { dataField: 'invitedOn', isKey: false, title: 'Invited' },
        { width: '176px',  isKey:false, title: 'Update',
          dataFormat:(cell, row) => {
            return (<div className="updateColumn">
              <Button>Resend</Button>
              <Button>Cancel</Button>
            </div>)
          },
        }
      ]
    }

    return (
      <div className="userManagement routeContainer">
        <h3>Manage Users</h3>
        <div>
          <Row>
            <Col xs={12} sm={10} md={4} lg={4}>
              <h1>Invite a team member</h1>
            </Col>

            <Col xs={12} sm={10} md={8} lg={8}>

              <Row>
                <Col xs={12}>
                  <TableComponent 
                    title="Pending invites"
                    data={pendingUsers.data}
                    columns={pendingUsers.columns}
                  />
                </Col>
                <Col xs={12}>
                  <TableComponent
                    title={`${user.brokerName} users`}
                    options={{
                      sizePerPage: 5,
                      pageStartIndex: 1, // where to start counting the pages
                      paginationSize: 3,  // the pagination bar size.
                    }}
                    data={activeUsers.data}
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
  user: PropTypes.object
}

export default connect((store) => {
  return {
    user: store.user
  }
})(UserManagement)
