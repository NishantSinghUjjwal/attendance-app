import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import SingleReport from "./SingleReport";
import SingleStudent from "./SingleStudent";
const Report = () => {
  const { fetchStudents, studentList } = useGlobalContext();
  return (
    <div className="student-report">
      <Link className="link" to="/">
        Go back
      </Link>
      <h1 style={{ marginBottom: "20px" }}>Student Report</h1>
      <div
        className="take-attendance-header-1"
        style={{ marginBottom: "20px" }}
      >
        <div className="take-attendance-select-container">
          <select
            className="register-select"
            onChange={(e) => fetchStudents(e.target.value)}
          >
            <option value="FYBCS">FYBCS</option>
            <option value="SYBCS">SYBCS</option>
            <option value="TYBCS">TYBCS</option>
            <option value="FYMCS">FYMCS</option>
            <option value="SYMCS">SYMCS</option>
          </select>
        </div>
      </div>
      <div className="student-container">
        {studentList.map((student) => (
          <SingleStudent student={student} />
        ))}
      </div>
    </div>
  );
};

export default Report;
