// Header.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/api/v1/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUsername(userInfo.username);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/api/v1/logout", {
      credentials: "include",
      method: "POST",
    });
    setUsername(null);
  }

  return (
    <header className="header md:px-20">
      <div className="logo-container md:ml-6">
        {/* <Logo /> */}
        <Link to="/">Logo</Link>
      </div>
      <nav>
        {username ? (
          <>
            <ul className="nav-list">
              <li>
                <Link
                  to="/create"
                  className="nav-link"
                  onClick={() => console.warn(window.location.protocol)}
                >
                  create Post
                </Link>
              </li>
              <li>
                <Link to="/" className="nav-link font-thin ">
                  {username}
                </Link>
              </li>
              <li>
                <Link to="/logout" className="nav-link" onClick={logout}>
                  LogOut
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <>
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
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
