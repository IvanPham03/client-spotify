import React, { Component } from 'react';

import UserDetails from '../userDetails/userDetails';
import Search from '../trackSearch/trackSearch';
import meomeo from '../../utilities/ass/meomeo.jpg'
import './header.css';

class Header extends Component {
  render = () => (
    <div className="main-header">
      <Search />
      <UserDetails username={this.props.username} img={meomeo} />
    </div>
  );
}

export default Header;
