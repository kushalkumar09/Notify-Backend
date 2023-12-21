import React, { useState } from "react";
import {Navigate} from "react-router-dom";

const Login = () => {
  // Local state to manage form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[redirect, setRedirect] = useState(false);

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        setRedirect(true);
      }
      else {
        alert("Invalid username or password");
      }
      
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("An error occurred during login. Please try again.");
    }
  };

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <div className="w-full h-fit flex justify-center p-10">
      <form
        onSubmit={handleLogin}
        className=" bg-slate-50 md:w-1/3 md:p-7 rounded-md flex flex-col"
      >
        <h2 className="mt-5 md:mt-2 mb-6 font-bold uppercase flex justify-center">
          Login Here
        </h2>
        <label>
          Username:
          <input
            className="p-1 rounded-md w-full"
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            className="p-1 rounded-md w-full"
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button
          type="submit"
          className="flex mb-3 items-center justify-center font-medium bg-violet-700 text-white h-9 rounded-md hover:bg-violet-800 transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
