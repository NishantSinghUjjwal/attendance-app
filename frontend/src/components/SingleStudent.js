import React, { useState } from "react";
import { useGlobalContext } from "./context";
import SingleReport from "./SingleReport";

const SingleStudent = ({ student }) => {
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div>
      {showModal && (
        <SingleReport student={student} setShowModal={setShowModal} />
      )}
      <div className="student-report-student" onClick={handleModal}>
        <h4 className="student-roll">{student.roll_no}</h4>
        <h4 className="student-name">
          {student.first_name} {student.middle_name} {student.last_name}
        </h4>
      </div>
    </div>
  );
};

export default SingleStudent;
