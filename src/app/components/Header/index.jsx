import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './../../actions/userActions'
import PropTypes from 'prop-types'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

import {
  Nav,
  NavItem,
  Navbar
} from 'react-bootstrap'

export class Header extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.logout()
  }

  render() {
    return (
      <Navbar inverse fluid>
      <div className="">
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to="/submissions">
              <a>Owner's Edge</a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {this.props.user &&
              <IndexLinkContainer to="/submissions">
                <NavItem className="nav-link" eventKey={1}>Submissions</NavItem>
              </IndexLinkContainer>}

            {!this.props.user &&
              <LinkContainer to="/">
                <NavItem className="nav-link" eventKey={3}>Log In</NavItem>
              </LinkContainer>}

            {this.props.user && this.props.user.role === 'admin' &&
              <LinkContainer onMouseUp={this.resetEdit} to="/users">
                <NavItem className="nav-link" eventKey={4}>Manage Users</NavItem>
              </LinkContainer>}

            {this.props.user &&
              <NavItem onClick={this.logout} className="nav-link" eventKey={4}>Log Out</NavItem>}
          </Nav>
        </Navbar.Collapse>
      </div>
      </Navbar>
    )
  }
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired
}

export default connect((store) => {
  return {
    user: store.user
  }
}, actions, null, { pure: false })(Header)