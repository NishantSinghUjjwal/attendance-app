import React from "react";
import { useGlobalAdminContext } from "./adminContext";
import { useState } from "react";

const UpdateStudet = ({ student }) => {
  const { editStudent } = useGlobalAdminContext();
  const [updatedStudent, setUpdatedStudent] = useState({
    std_class: "",
    year: "",
    roll_no: "",
    first_name: "",
    middle_name: "",
    last_name: "",
  });

  const handleUpdateStudent = (e) => {
    setUpdatedStudent((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div key={student._id} className="update-student-container">
      <div>
        <input
          className="login-input"
          type="text"
          placeholder={student.std_class}
          value={updatedStudent.std_class}
          name="std_class"
          onChange={handleUpdateStudent}
        ></input>
      </div>
      <div>
        <input
          className="login-input"
          type="text"
          value={updatedStudent.year}
          placeholder={student.year}
          name="year"
          onChange={handleUpdateStudent}
        ></input>
      </div>
      <div>
        <input
          className="login-input"
          type="text"
          value={updatedStudent.roll_no}
          placeholder={student.roll_no}
          name="roll_no"
          onChange={handleUpdateStudent}
        ></input>
      </div>
      <div>
        <input
          className="login-input"
          type="text"
          value={updatedStudent.first_name}
          placeholder={student.first_name}
          name="first_name"
          onChange={handleUpdateStudent}
        ></input>
      </div>
      <div>
        <input
          className="login-input"
          type="text"
          value={updatedStudent.middle_name}
          placeholder={student.middle_name}
          name="middle_name"
          onChange={handleUpdateStudent}
        ></input>
      </div>
      <div>
        <input
          className="login-input"
          type="text"
          value={updatedStudent.last_name}
          placeholder={student.last_name}
          name="last_name"
          onChange={handleUpdateStudent}
        ></input>
      </div>
      <button className="btn" onClick={() => editStudent(updatedStudent)}>
        Update
      </button>
    </div>
  );
};

export default UpdateStudet;
