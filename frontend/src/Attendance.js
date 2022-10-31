import React, { useEffect, useState } from "react";
import Student from "./Student";
function Attendance() {
  const students = [
    { simg: "", sname: "Andrew", rollno: 1, absent: false, present: true },
    { simg: "", sname: "Bella", rollno: 2, absent: false, present: true },
    { simg: "", sname: "Caroline", rollno: 3, absent: false, present: true },
    { simg: "", sname: "Dash", rollno: 4, absent: false, present: true },
    { simg: "", sname: "Jacob", rollno: 5, absent: false, present: true },
    { simg: "", sname: "Max", rollno: 6, absent: false, present: true },
    { simg: "", sname: "Jasmine", rollno: 7, absent: false, present: true },
    { simg: "", sname: "Tobey", rollno: 8, absent: false, present: true },
    { simg: "", sname: "Jack", rollno: 9, absent: false, present: true },
    { simg: "", sname: "James", rollno: 10, absent: false, present: true },
    { simg: "", sname: "Selena", rollno: 11, absent: false, present: true },
    { simg: "", sname: "Emma", rollno: 12, absent: false, present: true },
    { simg: "", sname: "Jake", rollno: 13, absent: false, present: true },
    { simg: "", sname: "Adam", rollno: 14, absent: false, present: true },
    { simg: "", sname: "Sam", rollno: 15, absent: false, present: true },
    { simg: "", sname: "Mark", rollno: 16, absent: false, present: true },
    { simg: "", sname: "Alexendar", rollno: 17, absent: false, present: true },
    { simg: "", sname: "Jhon", rollno: 18, absent: false, present: true },
    { simg: "", sname: "Chris", rollno: 19, absent: false, present: true },
    { simg: "", sname: "Tony", rollno: 20, absent: false, present: true },
  ];
  const [studentList, setStudentList] = useState(students);
  function handleStudentSearch(e) {
    console.log(e.target.value);
    if (e.target.value === "") {
      setStudentList(students);
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
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("https://randomuser.me/api/?results=20");
      const data = await response.json();
      data.results.map((user, index) => {
        students[index].simg = user.picture.medium;
      });
    };
    fetchUser();
  }, []);
  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <input className="attendance-input" type="date"></input>
        <select className="attendance-input year">
          <option>F.Y B.C.S</option>
          <option>S.Y B.C.S</option>
          <option>T.Y B.C.S</option>
          <option>F.Y M.C.S</option>
          <option>S.Y M.C.S</option>
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
