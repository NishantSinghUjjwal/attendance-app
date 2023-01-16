import React, { useEffect, useState } from "react";
function Student({ student, handlePresentee }) {
  const [togglePresent, setTooglePresent] = useState(false);

  const handleToogle = () => {
    setTooglePresent(!togglePresent);
  };
  useEffect(() => {
    if (student.roll_no != null) {
      handlePresentee(togglePresent, student.roll_no);
    }
  }, [togglePresent, student.roll_no]);
  return (
    <div className="student-container">
      <div className="student-rollno">
        <span className="rollno-no">{student.roll_no}</span>
      </div>
      <div className="student-img-container">
        <img className="student-img" src={student.simg} alt="student pic"></img>
      </div>
      <div className="student-name">{student.first_name}</div>
      <div className="student-name">{student.last_name}</div>
      <div className="student-present">
        <button
          className={`to-be-taken ${
            togglePresent ? "present-btn" : "absent-btn"
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
