import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { Grid, Row, Col } from 'react-bootstrap'

export class UserManagement extends Component {
  componentDidMount() {
    if (this.props.user && this.props.user.role !== 'admin') {
      browserHistory.push('/submissions')
    }
  }

  render() {
    return (
      <div className="userManagement route">
        <h3>Manage Users</h3>
        <Grid>
          <Row>
            <Col xs={12} sm={10} md={4} lg={4}>
              <h1>Invite a team member</h1>
            </Col>

            <Col xs={12} sm={10} md={8} lg={8}>

              <Row>
                <Col xs={12}>
                  <h1>Pending invites</h1>
                    <PendingUsersView />
                </Col>
                <Col xs={12}>
                  <h1>Brokerage users</h1>
                    <ActiveUsersView />
                </Col>
              </Row>

            </Col>

          </Row>
        </Grid>
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
