import React from "react";
import "./Header.css"

import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <nav className="nav-bar">
      <a className="nav-bar__title">
        Vacation
      </a>
      <div className="nav-bar__right">
        <Link className = "nav_bar__links" to="/favorites">Favorites</Link>
        <Link className = "nav_bar__links" to="/">Sign Out</Link>
      </div>
    </nav>
  )
}

export default Header