import React, { useEffect, useState } from "react";
import Student from "./Student";
function Attendance() {
  const [studentList, setStudentList] = useState([]);
  function handleStudentSearch(e) {
    console.log(e.target.value);
    if (e.target.value === "") {
      // setStudentList(students);
    } else {
      const newList = studentList.filter(
        (student) =>
          ("" + student.rollno).includes(e.target.value) ||
          student.sname.toLowerCase().startsWith(e.target.value)
      );
      setStudentList(newList);
    }
  }
  function handlePresentee(presentee) {
    setStudentList((prev) =>
      prev.map((student) => {
        if (student.rollno == presentee.rollno) {
          return {
            ...student,
            absent: presentee.absent,
            present: presentee.present,
          };
        } else {
          return student;
        }
      })
    );
  }
  async function getStudentByClass(e) {
    try {
      console.log(e.target.value);
      const response = await fetch(
        "http://localhost:4000/student/fetch-by-class",
        {
          method: "GET",
          body: {
            std_class: e.target.value,
            year: 2022,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("result is: ", JSON.stringify(result, null, 4));
    } catch (err) {
      console.log(err);
    }
  }

  function handlePresentAll(e) {
    setStudentList((prev) =>
      prev.map((student) => {
        if (e.target.value == "Present All") {
          return { ...student, present: true, absent: false };
        } else {
          return { ...student, absent: true, present: false };
        }
      })
    );
  }

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <input className="attendance-input" type="date"></input>
        <select
          className="attendance-input year"
          onChange={(e) => getStudentByClass(e)}
        >
          <option value="fybcs">F.Y B.C.S</option>
          <option value="sybcs">S.Y B.C.S</option>
          <option value="tybcs">T.Y B.C.S</option>
          <option value="fymcs">F.Y M.C.S</option>
          <option value="symcs">S.Y M.C.S</option>
        </select>
        <select className="attendance-input subject">
          <option>Web FrameWorks</option>
          <option>Web FrameWorks</option>
          <option>Web FrameWorks</option>
          <option>Web FrameWorks</option>
        </select>
      </div>

      <div className="attendance-present-all">
        <input
          className="student-search"
          type="search"
          placeholder="Search Student.."
          onChange={(e) => handleStudentSearch(e)}
        ></input>
        <select onChange={(e) => handlePresentAll(e)}>
          <option>Present All</option>
          <option>Absent All</option>
        </select>
      </div>
      <div className="attendance-main">
        <div className="student-collection">
          {studentList.map((student, index) => (
            <Student
              key={index}
              student={student}
              handlePresentee={handlePresentee}
            />
          ))}
        </div>
      </div>
      <button className="btn take-attendance">
        <div className="take-attendance-bg">Take Attendance</div>
      </button>
    </div>
  );
}

export default Attendance;
