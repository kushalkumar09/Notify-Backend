import React, { useState } from "react";
import { Navigate } from "react-router";
// import Post from "./Post";

const Register = () => {
  // Local state to manage form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  //   // Function to handle form submission
  const handleRegister =async(e) => {
      e.preventDefault();
      const userReg = await fetch("http://localhost:4000/api/v1/register", {
          method: 'Post',
          body:JSON.stringify({username, password}),
          headers: { 'Content-Type': 'application/json' },

      })
    console.log(userReg);
      

    // Validate login (you might want to perform actual authentication here)
    

    if ((username && password) && userReg.ok) {
        setRedirect(true);
        alert(`registration successful`);
        
      // You can perform additional logic here, such as making an API request for authentication
    } else {
      alert("Username taken or invalid");
    }
  };

  if (redirect) {
    return (
        <Navigate to="/"/>
    )
  }

  return (
    <div className="w-full md:h-fit h-screeen flex justify-center p-10">
      <form
        onSubmit={handleRegister}
        className=" bg-slate-50 md:w-1/3 md:h-auto md:p-7 p-6 max-h-screen rounded-md flex flex-col"
      >
        <h2 className="mt-5 md:mt-2 mb-6 font-bold uppercase flex justify-center">
          Register Here
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
        {/* {username} */}
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
        {/* {password} */}
        <br />
        <button
          type="submit"
          className="flex md:mb-3 items-center justify-center font-medium bg-violet-700 text-white h-9 rounded-md hover:bg-violet-800 transition-all duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
