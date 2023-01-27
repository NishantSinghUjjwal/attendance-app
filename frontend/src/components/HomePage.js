import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import TakeAttendance from "./TakeAttendance";
import Report from "./Report";
import { useGlobalContext } from "./context";
const HomePage = () => {
  const { userData, fetchUserDetails, handleLogout } = useGlobalContext();
  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div>
      <div className="homepage-header">
        <h1>Welcome {userData?.first_name}</h1>
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                padding: "20px",
                alignItems: "center",
              }}
            >
              <Link className="link" to="/TakeAttendance">
                <button className="btn homepage-btn">Take Attendance</button>
              </Link>
              <Link className="link" to="/StudentReport">
                <button className="btn homepage-btn">Student Report</button>
              </Link>
            </div>
          }
        ></Route>
        <Route path="/TakeAttendance" element={<TakeAttendance />}></Route>
        <Route path="/StudentReport" element={<Report />}></Route>
      </Routes>
    </div>
  );
};

export default HomePage;
