import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from './styles';

class Logo extends Component{
  constructor(props){
    super(props);
    this.state = { token: localStorage.getItem('token') };
  }

  action(e){
    console.log(e);
  }

  render(){
    const text = this.state.token ? 'Log out' : 'Log in';
    return (
    <div className="nav-bar">
      <div className='logo-type'>
        Owner's Edge
      </div>
      {this.state.token && <div className="links">
        <Link to='/form' >Submit New </Link>
        <a onClick={()=> this.action(text)}>{text}</a>
      </div>}
    </div>
  );
  }
}


export default Logo;
