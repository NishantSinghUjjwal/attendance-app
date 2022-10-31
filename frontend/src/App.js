import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import DashBoard from "./DashBoard";
import Attendance from "./Attendance";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Message from "./Message";
import Loading from "./Loading";
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState({ message: "", type: "" });
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const sendRegister = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/user/register", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        setIsRegister(true);
        setError({ message: "User Registered", type: true });
        errorDisplay();
      } else {
        setError({ message: "Error Occured", type: false });
        errorDisplay();
      }
      console.log("result is: ", JSON.stringify(result, null, 4));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const errorDisplay = () => {
    setShowError(true);
    const timeOut = setTimeout(() => {
      setShowError(false);
    }, 2000);
    clearTimeout(() => timeOut);
  };
  const sendLogin = async (loginData) => {
    setLoading(true);
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

      console.log("result is: ", result);

      setIsLogin(result.payload.allow_login);
      if (result.payload.allow_login) {
        setError({ message: "Login Successful", type: true });
        errorDisplay();
      } else {
        setError({ message: "No such user exist", type: false });
        errorDisplay();
      }
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <BrowserRouter>
      {loading && <Loading />}
      <Message error={error} showError={showError} />
      {/* {isLogin && <Attendance />} */}
      {/* {isRegister && <Login sendLogin={sendLogin} />} */}
      <Routes>
        {isRegister ? (
          <Route
            exact
            path="/"
            element={<Login sendLogin={sendLogin} />}
          ></Route>
        ) : (
          <Route
            exact
            path="/"
            element={<Register sendRegister={sendRegister} />}
          ></Route>
        )}
        {isLogin ? (
          <Route exact path="/login" element={<Attendance />}></Route>
        ) : (
          <Route
            exact
            path="/login"
            element={<Login sendLogin={sendLogin} />}
          ></Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}
//firstname
//last name
//middlename
//subject they choose
export default App;
