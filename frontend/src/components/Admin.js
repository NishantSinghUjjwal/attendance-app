import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ModifyClass from "./ModifyClass";
import ModifyStudent from "./ModifyStudent";
import ModifySubject from "./ModifySubject";
import { AdminAppProvider } from "./adminContext";
import Error from "./Error";

const Admin = () => {
  const handleLogout = () => {
    window.location.reload();
  };
  return (
    <AdminAppProvider>
      <Router>
        <div className="admin-header">
          <h1>Admin Page</h1>
          <button className="btn admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <div
                style={{
                  marginTop: "50px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <button className="btn">
                  <Link to="/ModifyStudent" className="link-btn">
                    Modify Students
                  </Link>
                </button>
                <button className="btn">
                  <Link to="ModifySubject" className="link-btn">
                    Modify Subjects
                  </Link>
                </button>
                {/* <button className="btn">
                  <Link to="ModifyClass" className="link-btn">
                    Modify Class
                  </Link>
                </button> */}
              </div>
            }
          ></Route>
          <Route path="/ModifyStudent" element={<ModifyStudent />}></Route>
          <Route path="/ModifySubject" element={<ModifySubject />}></Route>
          {/* <Route path="/ModifyClass" element={<ModifyClass />}></Route> */}
        </Routes>
      </Router>
    </AdminAppProvider>
  );
};

export default Admin;
