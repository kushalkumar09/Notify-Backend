// Header.js

import React, { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";

const Header = () => {
  // const [username, setUsername] = useState(null);
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/api/v1/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch("http://localhost:4000/api/v1/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className="header md:px-6 py-4 bg-zinc-900">
      <div className="container mx-auto flex items-center justify-between">
        <div className="logo-container ml-4">
          {/* <Logo /> */}
          <Link to="/" className="text-white text-2xl font-bold">
            Notify
          </Link>
        </div>
        <nav className="hidden md:block">
          {" "}
          {/* Hide on small screens */}
          {username ? (
            <ul className="flex items-center space-x-4">
              <li>
                <Link to="/create" className="nav-link">
                  Create Post
                </Link>
              </li>
              <li>
                <Link to="/" className="nav-link text-gray-300">
                  {username}
                </Link>
              </li>
              <li>
                <Link to="/" className="nav-link" onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex items-center space-x-4">
              <li>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="nav-link text-gray-300">
                  Login
                </Link>
              </li>
            </ul>
          )}
        </nav>
        {/* Add a responsive menu icon for small screens */}
        <div className="block md:hidden">
          <button className="text-white focus:outline-none">
            {/* Add a responsive menu icon (e.g., a hamburger icon) */}
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M4 6h16M4 12h16m-7 6h7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
