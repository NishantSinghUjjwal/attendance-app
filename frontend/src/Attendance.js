import React, { useState } from "react";
import Student from "./Student";
function Attendance() {
  const [studentList, setStudentList] = useState([]);
  const [presentArr, setPresentArr] = useState([]);
  const [absentArr, setAbsentArr] = useState([]);
  const [presentAll, setPresentAll] = useState(false);
  function handleStudentSearch(e) {}
  const takeAttendance = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/attendance/add-attendance",
        {
          method: "POST",
          body: JSON.stringify({
            att_date: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
            att_class: "fybcs",
            att_subject: 104,
            attendance: {
              present: presentArr,
              absent: absentArr,
            },
            att_year: 2022,
          }),
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
  };
  function handlePresentee(togglePresent, rollno) {
    if (togglePresent) {
      const newAbsent = absentArr.filter((roll) => roll != rollno);
      setAbsentArr(newAbsent);
      setPresentArr((prev) => [...prev, rollno]);
    } else {
      const newPresent = presentArr.filter((roll) => roll != rollno);
      setPresentArr(newPresent);
      setAbsentArr((prev) => [...prev, rollno]);
    }
  }
  const getStudentByClass = async (e) => {
    try {
      console.log(e.target.value);
      const response = await fetch(
        "http://localhost:4000/student/fetch-by-class",
        {
          method: "POST",
          body: JSON.stringify({
            std_class: e.target.value,
            year: 2022,
          }),
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
      setStudentList(result.payload);
    } catch (err) {
      console.log(err);
    }
  };

  function handlePresentAll(e) {
    // console.log(e.target.value);
    if (e.target.value == "present") {
      setPresentAll(true);
    } else {
      setPresentAll(false);
    }
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
          <option value="present">Present All</option>
          <option value="absent">Absent All</option>
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
      <button className="btn take-attendance" onClick={takeAttendance}>
        <div className="take-attendance-bg">Take Attendance</div>
      </button>
    </div>
  );
}

export default Attendance;
