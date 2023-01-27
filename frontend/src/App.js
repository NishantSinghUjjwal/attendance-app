//handle logout function

import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import { useGlobalContext } from "./components/context";
import Loading from "./components/Loading";
import Admin from "./components/Admin";
import Error from "./components/Error";
const App = () => {
  const { loginData, isLogin, isRegister, loading, showMessage } =
    useGlobalContext();
  console.log(isLogin);
  if (loginData.username === "1admin1" && loginData.password === "admin@1234") {
    return <Admin />;
  }
  if (loading) {
    return <Loading />;
  }

  if (isLogin == "true") {
    return (
      <Router>
        {showMessage && (
          <Error message="Login Succesful" type="success"></Error>
        )}
        <HomePage />
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route
          path="*"
          element={
            <div>
              Ooops u shoudn't be here
              <Link to="/">Go back</Link>
            </div>
          }
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
