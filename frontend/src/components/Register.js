import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useGlobalContext } from "./context";
import Error from "./Error";
const Register = () => {
  const {
    subjectList,
    setRegisterData,
    registerData,
    handleRegister,
    isRegister,
    showMessage,
  } = useGlobalContext();

  console.log(subjectList);
  const handleRegisterInput = (e) => {
    setRegisterData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  if (isRegister) {
    return <Navigate to="/" />;
  }
  return (
    <div className="register-container">
      {showMessage && <Error type="failure" message="Register Failed" />}
      <h1>REGISTER PAGE</h1>
      <input
        type="text"
        placeholder="Enter firstname"
        onChange={handleRegisterInput}
        name="first_name"
        value={registerData.first_name}
        className="register-input"
      ></input>
      <input
        type="text"
        placeholder="Enter middlename"
        onChange={handleRegisterInput}
        name="middle_name"
        value={registerData.middle_name}
        className="register-input"
      ></input>
      <input
        type="text"
        placeholder="Enter lastname"
        onChange={handleRegisterInput}
        name="last_name"
        value={registerData.last_name}
        className="register-input"
      ></input>
      <input
        type="text"
        placeholder="Enter username"
        onChange={handleRegisterInput}
        name="username"
        value={registerData.username}
        className="register-input"
      ></input>
      <input
        name="password"
        type="password"
        placeholder="Enter password"
        onChange={handleRegisterInput}
        value={registerData.password}
        className="register-input"
      ></input>
      Select subject:
      <select
        onChange={handleRegisterInput}
        name="subject"
        value={registerData.subject}
        className="register-select"
      >
        {subjectList.map((subject, idx) => (
          <option key={idx} value={subject.sub_name}>
            {subject.sub_name}
          </option>
        ))}
      </select>
      <button onClick={handleRegister} className="btn">
        Register
      </button>
      <p>
        Already a Teacher?
        <Link to="/" className="link">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
