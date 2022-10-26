import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import DashBoard from "./DashBoard";
import Attendance from "./Attendance";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Message from "./Message";
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState({ message: "", type: "" });
  const sendLogin = async (loginData) => {
    // console.log(loginData);
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
        setError({ message: "succesfull loggedIn", type: "success" });
      } else {
        setError({ message: "No such user exist", type: "failure" });
      }
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BrowserRouter>
      <Message error={error} />
      {isLogin && <Attendance />}
      <Routes>
        <Route exact path="/" element={<Register />}></Route>
        {!isLogin && (
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
