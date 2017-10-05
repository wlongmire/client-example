import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { Row, Col } from 'react-bootstrap'
import TableComponent from './../../components/shared/TableComponent'

export class UserManagement extends Component {
  componentDidMount() {
    if (this.props.user && this.props.user.role !== 'admin') {
      browserHistory.push('/submissions')
    }
  }

  render() {
    const user = this.props.user

    const date = moment(Date()).format('MM/DD/YY HH:mm')
    
    const pendingUsers = [
      { email: 'this@gmail.com', admin: '', lastOnline: date },
      { email: 'this@gmail.com', admin: '', lastOnline: date },
      { email: 'this@gmail.com', admin: '', lastOnline: date }
    ]

    const activeUsers = [
      { email: 'warrenlongmire@gmail.com', admin: 'Yes', lastOnline: date },
      { email: 'warrenlongmire@gmail.com', admin: '', lastOnline: date },
      { email: 'warrenlongmire@gmail.com', admin: 'Yes', lastOnline: date },
      { email: 'warrenlongmire@gmail.com', admin: 'Yes', lastOnline: date },
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
                    data={pendingUsers}
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
                    data={activeUsers}
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
