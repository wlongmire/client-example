import React from 'react';

import styles from './styles';

function Logo(props) {
  return (
  <div className="nav-bar">
    <div className='logo-type'>
      Owner's Edge
    </div>
    <div className="links">
      <a href="#">Submit New</a>
      <a href="#">My Account (Log in)</a>
    </div>
  </div>
  );
}

export default Logo;
