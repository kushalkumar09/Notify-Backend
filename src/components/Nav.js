// Header.js

import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        {/* <Logo /> */}
        <Link to='/'>Logo</Link>
      </div>
      <nav>
        <ul className="nav-list">
          <li>
            <Link
              to="/register"
              className="nav-link"
              onClick={() => console.warn(window.location.protocol)}
            >
              Register
            </Link>
          </li>
          <li>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
