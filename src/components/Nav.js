// Header.js

import React, { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";

const Header = () => {
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
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="logo-container ml-4">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            <span className=" font-Long text-4xl">Notify</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-4">
          {username ? (
            <>
              <Link
                to="/create"
                className="text-gray-800 hover:text-blue-500 transition duration-300 ease-in-out"
              >
                Create Post
              </Link>
              <Link
                to="/"
                className="text-gray-800 hover:text-blue-500 transition duration-300 ease-in-out"
              >
                {username}
              </Link>
              <Link
                to="/"
                className="text-gray-800 hover:text-blue-500 transition duration-300 ease-in-out"
                onClick={logout}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="text-gray-800 hover:text-blue-500 transition duration-300 ease-in-out"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-gray-800 hover:text-blue-500 transition duration-300 ease-in-out"
              >
                Login
              </Link>
            </>
          )}
        </nav>
        <div className="block md:hidden">
          <button className="text-gray-800 focus:outline-none">
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
