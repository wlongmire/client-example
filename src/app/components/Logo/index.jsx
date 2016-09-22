import React from 'react';
import { Link } from 'react-router';

import styles from './styles';

function Logo(props) {
  return (
  <div className="nav-bar">
    <div className='logo-type'>
      Owner's Edge
    </div>
    <div className="links">
      <Link to='/form' >Submit New </Link>
      <a href="#">My Account (Log in)</a>
    </div>
  </div>
  );
}

export default Logo;
