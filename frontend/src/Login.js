import React, { useState } from "react";

function Login() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const handleLogin = (e) => {
    setLoginData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const sendLogin = async () => {
    console.log(loginData);
    try {
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log("result is: ", JSON.stringify(result, null, 4));

      console.log(result);
    } catch (err) {
      console.log(err);
    }
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
      <button className="btn" onClick={sendLogin}>
        LogIn
      </button>
      <p className="suggestion">
        Are u a New Teacher?<a>Register as Teacher</a>
      </p>
    </div>
  );
}

export default Login;
