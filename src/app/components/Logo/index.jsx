import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../Home/actions';

import styles from './styles';

class Logo extends Component{
  constructor(props){
    console.log(props);
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

  render(){
    return (
    <div className="nav-bar">
      <div className='logo-type'>
        Owner's Edge
      </div>
       <div className="links">
        <Link to='/home' >Submissions </Link>
        <Link to='/choicepage'>Submit New </Link>
        {this.props.user.state && <a onClick={this.logout}>Log out</a>}
      </div>
    </div>
  );
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  };
}
export default connect(mapStateToProps, actions)(Logo);
