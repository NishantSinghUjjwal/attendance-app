import React, { useState } from "react";
import { Link } from "react-router-dom";
function Login({ sendLogin }) {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const handleLogin = (e) => {
    setLoginData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>

      <input
        className="login-input input"
        name="username"
        placeholder="Username"
        onChange={(e) => handleLogin(e)}
        value={loginData.username}
      ></input>
      <input
        className="login-input input"
        name="password"
        placeholder="Password"
        onChange={(e) => handleLogin(e)}
        value={loginData.password}
      ></input>
      <button className="btn" onClick={() => sendLogin(loginData)}>
        LogIn
      </button>
      <p className="suggestion">
        Are u a New Teacher?
        <Link to="/">Register as Teacher</Link>
      </p>
    </div>
  );
}

export default Login;
