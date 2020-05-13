import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/login';
import './Header.css'

import { Link } from 'react-router-dom';

const Header = ({ logoutUser, loggedIn}) => {
  function logout() {
    logoutUser()
  }
  return (
    <nav className="nav-bar">
      <a className="nav-bar__title">
        Vacation
      </a>
        {
          loggedIn ? 

          <div className="nav-bar__right">
          <Link className="nav_bar__links" to="/areas">Areas</Link>

          <Link className="nav_bar__links" to="/favorites">Favorites</Link>
          <Link
            className="nav_bar__links" 
            to="/"
            onClick={logout}
          >
            Sign Out
            </Link>
            </div> 
            :
            ""
        }

      
    </nav>
  )
}

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logout())
});

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);