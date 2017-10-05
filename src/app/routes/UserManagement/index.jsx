import React, { Component, PropTypes } from 'react'
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
                  <TableComponent title="Pending invite" />
                </Col>
                <Col xs={12}>
                  <TableComponent title="Marsh users" />
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
