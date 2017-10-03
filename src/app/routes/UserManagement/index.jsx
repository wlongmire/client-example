import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

export class UserManagement extends Component {
  componentDidMount() {
    if (this.props.user && this.props.user.role !== 'broker') {
      browserHistory.push('/submissions')
    }
  }

  render() {
    return (
      <div className="userManagement route">
        <h3>User Management</h3>
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
