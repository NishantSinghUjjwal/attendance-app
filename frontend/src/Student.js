import React, { useState } from "react";
import { TfiCheck } from "react-icons/tfi";
function Student({ student, handlePresentee }) {
  return (
    <div className="student-container">
      <div className="student-rollno">
        {/* <span className="rollno-name">Roll No.</span> */}
        <span className="rollno-no">{student.rollno}</span>
      </div>
      <div className="student-img-container">
        <img className="student-img" src={student.simg}></img>
      </div>
      <div className="student-name">{student.sname}</div>
      <div className="student-present">
        <button
          className={`to-be-taken ${student.present && "present-btn"} ${
            student.absent && "absent-btn"
          }`}
          onClick={() =>
            handlePresentee({
              present: !student.present,
              absent: !student.absent,
              rollno: student.rollno,
            })
          }
        >
          {student.present && "P"}
          {student.absent && "A"}
        </button>
      </div>
    </div>
  );
}

export default Student;
