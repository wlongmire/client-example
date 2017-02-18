import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../Home/actions';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import {
  Nav,
  NavItem,
  Navbar
} from 'react-bootstrap';

import styles from './styles';

class Logo extends Component{
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  logout(){
    this.props.logout();
  }

  resetForm(){
    this.props.resetForm();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (!nextProps.user.state){
  //     browserHistory.push('/');
  //   }
  // }

  render(){

    return (
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/home">Owner's Edge</a>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
                {this.props.user.state &&
                  <IndexLinkContainer to="/home">
                    <NavItem className="nav-link" eventKey={1}>Submissions</NavItem>
                  </IndexLinkContainer>}
                {this.props.user.state && 
                  <LinkContainer to="/choicepage">
                    <NavItem className="nav-link" eventKey={2}>Submit New</NavItem>
                  </LinkContainer>}
                {!this.props.user.state &&
                  <LinkContainer to="/">
                    <NavItem className="nav-link" eventKey={3}>Log In</NavItem>
                  </LinkContainer>}
                {this.props.user.state &&
                  <NavItem className="pullRight" onClick={this.logout} className="nav-link" eventKey={4}>Log Out</NavItem>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  };
}
export default connect(mapStateToProps, actions, null, {pure: false})(Logo);
