import React, { useState } from "react";
import { Navigate } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const userReg = await fetch("http://localhost:4000/api/v1/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (username && password && userReg.ok) {
      setRedirect(true);
      alert("Registration successful");
    } else {
      alert("Username taken or invalid");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-slate-50 w-full md:w-1/3 p-7 rounded-md flex flex-col"
      >
        <h2 className="mt-5 md:mt-2 mb-6 font-bold uppercase flex justify-center">
          Register Here
        </h2>
        <label className="mb-6">
          Username:
          <input
            className="p-1 rounded-md w-full"
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="mb-6">
          Password:
          <input
            className="p-1 rounded-md w-full"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
