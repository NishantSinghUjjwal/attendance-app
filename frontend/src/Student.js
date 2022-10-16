import React, { useState } from "react";
import { TfiCheck } from "react-icons/tfi";
function Student() {
  const [present, setPresent] = useState(false);
  return (
    <div className="student-container">
      <div className="student-rollno">
        <span className="rollno-name">Roll No.</span>
        <span className="rollno-no">1</span>
      </div>
      <div className="student-name">Nishant</div>
      <div className="student-present">
        <button
          className={`present-btn ${!present && "to-be-taken"}`}
          onClick={() => setPresent(!present)}
        >
          {present ? <TfiCheck className="tick" /> : "P"}
        </button>
      </div>
    </div>
  );
}

export default Student;
