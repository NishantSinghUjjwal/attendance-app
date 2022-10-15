import React from "react";

function Login() {
  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>
      {/* <input className="login-input input" placeholder="Username"></input> */}
      <input className="login-input input" placeholder="Password"></input>
      <button className="btn">LogIn</button>
      <p className="suggestion">
        Are u a New Teacher?<a>Register as Teacher</a>
      </p>
    </div>
  );
}

export default Login;
