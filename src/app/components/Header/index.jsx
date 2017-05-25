import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from 'app/actions/submissionActions'
import PropTypes from 'prop-types'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

import {
  Nav,
  NavItem,
  Navbar
} from 'react-bootstrap'

class Header extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.logout()
  }

  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/submissions">Owner's Edge</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {this.props.user &&
              <IndexLinkContainer to="/submissions">
                <NavItem className="nav-link" eventKey={1}>Submissions</NavItem>
              </IndexLinkContainer>}

            {this.props.user &&
              <LinkContainer onMouseUp={this.resetEdit} to="/productchoice">
                <NavItem className="nav-link" eventKey={2}>Submit New</NavItem>
              </LinkContainer>}

            {!this.props.user &&
              <LinkContainer to="/">
                <NavItem className="nav-link" eventKey={3}>Log In</NavItem>
              </LinkContainer>}

            {this.props.user &&
              <NavItem onClick={this.logout} className="nav-link" eventKey={4}>Log Out</NavItem>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

Header.propTypes = {
  user: PropTypes.object,
  resetForm: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(store) {
  return {
    user: store.user
  }
}

export default connect(mapStateToProps, actions, null, { pure: false })(Header)
