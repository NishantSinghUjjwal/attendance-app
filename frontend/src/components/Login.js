import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import Error from "./Error";
import { Button } from "@mui/material";
const Login = () => {
  const {
    setLoginData,
    loginData,
    handleLogin,
    isLogin,
    getToken,
    showMessage,
  } = useGlobalContext();
  const updateLoginData = (e) => {
    setLoginData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="login-container">
      {showMessage && <Error message="Login Failed" type="failure" />}
      <h1 style={{ textAlign: "center" }}>LOGIN PAGE</h1>
      <input
        type="text"
        placeholder="enter name"
        name="username"
        onChange={updateLoginData}
        value={loginData.username}
        className="login-input"
      ></input>
      <input
        type="password"
        placeholder="enter password"
        name="password"
        onChange={updateLoginData}
        value={loginData.password}
        className="login-input"
      ></input>
      <button onClick={handleLogin} className="btn">
        Login
      </button>
      <p>
        Are u a new Teacher?
        <Link className="link" to="/Register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
