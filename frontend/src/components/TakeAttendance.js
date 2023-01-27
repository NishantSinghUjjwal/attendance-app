import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import Error from "./Error";
const TakeAttendance = () => {
  const {
    userData,
    fetchUserDetails,
    fetchStudents,
    studentList,
    todayAttendance,
    setTodayAttendance,
    handleAttendance,
    searchedStudent,
    setSearchedStudent,
    showMessage,
  } = useGlobalContext();
  console.log(userData);

  const [totalPresent, setTotalPresent] = useState(0);

  const handlePresentAll = () => {
    setTodayAttendance((prev) =>
      prev.map((student) => {
        return { ...student, present: true };
      })
    );
  };
  const handleAbsentAll = () => {
    setTodayAttendance((prev) =>
      prev.map((student) => {
        return { ...student, present: false };
      })
    );
  };

  const handlePresent = (roll, present) => {
    // console.log(todayAttendance.find((student) => student.id === id));
    const currStudent = todayAttendance.filter(
      (student) => student.roll_no === roll
    );
    if (currStudent.length > 0) {
      setTodayAttendance((prev) =>
        prev.map((student) => {
          if (student.roll_no === roll) {
            return { ...student, present: !student.present };
          } else {
            return student;
          }
        })
      );
    } else
      setTodayAttendance((prev) => [
        ...prev,
        { roll_no: roll, present: !present },
      ]);
  };

  const handleSearchStudent = (e) => {
    setSearchedStudent(e.target.value);
  };

  useEffect(() => {
    fetchStudents("fybcs");
    fetchUserDetails();
  }, []);
  useEffect(() => {
    studentList.map((student) => {
      handlePresent(student.roll_no, true);
    });
    // console.log("useEffect ");
    // console.log(todayAttendance);
    handleAbsentAll();
  }, [studentList]);

  useEffect(() => {
    setTotalPresent(
      todayAttendance.filter((student) => student.present).length
    );
  }, [todayAttendance]);
  return (
    <div className="take-attendance">
      {showMessage && <Error message="Attendace Taken" type="success"></Error>}
      <Link className="link" to="/">
        Go back
      </Link>
      <h1>Attendance</h1>
      <div className="take-attendance-header-1">
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
        <div className="take-attendance-select-container">
          <select className="register-select">
            {userData?.subject?.map((sub) => (
              <option value={sub}>{sub}</option>
            ))}
          </select>
        </div>
        <div className="take-attendance-today-date">
          {`${new Date().getDate()}-${
            new Date().getMonth() + 1
          }-${new Date().getFullYear()}`}
        </div>
      </div>
      <div>
        <div className="take-attendance-btn-and-input-container">
          <button className="take-attendance-btn" onClick={handlePresentAll}>
            Present All
          </button>
          <button className="take-attendance-btn" onClick={handleAbsentAll}>
            Absent All
          </button>
          <input
            className="login-input take-attendance-input"
            type="text"
            placeholder="Search student by roll no or name"
            value={searchedStudent}
            onChange={handleSearchStudent}
          ></input>
        </div>
        <div className="student-container">
          {(searchedStudent.length === 0
            ? studentList
            : studentList.filter(
                (student) =>
                  student.roll_no === parseInt(searchedStudent) ||
                  (
                    student.first_name +
                    student.middle_name +
                    student.last_name
                  ).includes(searchedStudent)
              )
          ).map((student) => {
            return (
              <div className="student" key={student._id}>
                <div>
                  <span className="student-roll">{student.roll_no}. </span>
                  <span className="student-name">{student.first_name} </span>
                  <span className="student-name">{student.middle_name} </span>
                  <span className="student-name">{student.last_name} </span>
                </div>
                <button
                  className={`btn ${
                    todayAttendance.find((st) => st.roll_no === student.roll_no)
                      ?.present
                      ? "present"
                      : "absent"
                  }`}
                  onClick={() => handlePresent(student.roll_no, false)}
                >
                  {todayAttendance.find((st) => st.roll_no === student.roll_no)
                    ?.present
                    ? "Click for Absent"
                    : "Click for Present"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          padding: "10px",
          width: "100%",
          display: "flex",
          jsutifyCotent: "spaceBetween",
          alignItems: "center",
        }}
      >
        <button className="btn" onClick={handleAttendance}>
          Take Attendance
        </button>
        <span
          style={{
            marginLeft: "auto",
            fontSize: "20px",
            color: "var(--sub-theme)",
            fontWeight: "bold",
          }}
        >
          Students Present: {totalPresent}
        </span>
      </div>
    </div>
  );
};

export default TakeAttendance;
