import React, { useState } from "react";
import { TfiCheck } from "react-icons/tfi";
function Student({ student, handlePresentee }) {
  const [togglePresent, setTooglePresent] = useState(false);
  const handleToogle = () => {
    setTooglePresent(!togglePresent);
    handlePresentee(togglePresent);
  };
  return (
    <div className="student-container">
      <div className="student-rollno">
        {/* <span className="rollno-name">Roll No.</span> */}
        <span className="rollno-no">{student.roll_no}</span>
      </div>
      <div className="student-img-container">
        <img className="student-img" src={student.simg}></img>
      </div>
      <div className="student-name">{student.first_name}</div>
      <div className="student-name">{student.last_name}</div>
      <div className="student-present">
        <button
          className={`to-be-taken ${
            togglePresent ? "present-btn" : "absent-btn"
          }
          }`}
          onClick={handleToogle}
        >
          {togglePresent ? "P" : "A"}
        </button>
      </div>
    </div>
  );
}

export default Student;
