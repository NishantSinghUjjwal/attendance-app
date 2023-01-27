import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalAdminContext } from "./adminContext";
import UpdateStudent from "./UpdateStudent";

const ModifyStudent = () => {
  const {
    studentToAdd,
    setStudentToAdd,
    addStudent,
    studentListForDelete,
    fetchStudentsForDelete,
    deleteStudent,
    searchDeleteStudent,
    setSearchDeleteStudent,
    updatedStudent,
    setUpdatedStudent,
    editStudent,
    fetchStudentsForUpdate,
    studentListForUpdate,
    searchUpdateStudent,
    setSearchUpdateStudent,
  } = useGlobalAdminContext();

  const handleAddStudent = (e) => {
    setStudentToAdd((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div>
      <Link to="/" className="link">
        Go back
      </Link>
      <h1>Student Modification</h1>
      <div>
        <h2>Add Student</h2>
        <div className="admin-add-student">
          <select
            name="std_class"
            onChange={handleAddStudent}
            value={studentToAdd.std_class}
            className="register-select"
          >
            <option value="fybcs">FYBCS</option>
            <option value="sybcs">SYBCS</option>
            <option value="tybcs">TYBCS</option>
            <option value="fymcs">FYMCS</option>
            <option value="symcs">SYMCS</option>
          </select>
          <input
            type="text"
            placeholder="Enter year"
            name="year"
            onChange={handleAddStudent}
            value={studentToAdd.year}
            className="login-input"
          ></input>
          <input
            className="login-input"
            type="number"
            placeholder="Enter rollno"
            name="roll_no"
            onChange={handleAddStudent}
            value={studentToAdd.roll_no}
          ></input>
          <input
            className="login-input"
            type="text"
            placeholder="Firstname"
            name="first_name"
            onChange={handleAddStudent}
            value={studentToAdd.first_name}
          ></input>
          <input
            className="login-input"
            type="text"
            placeholder="Middlename"
            name="middle_name"
            onChange={handleAddStudent}
            value={studentToAdd.middle_name}
          ></input>
          <input
            className="login-input"
            type="text"
            placeholder="Lastname"
            name="last_name"
            onChange={handleAddStudent}
            value={studentToAdd.last_name}
          ></input>
          <button onClick={addStudent} className="btn">
            Add
          </button>
        </div>
        <h2>Delete Student</h2>
        <div className="admin-delete-student">
          <div className="search-and-input-container">
            <select
              className="register-select"
              onChange={(e) =>
                fetchStudentsForDelete(e.target.value.toLowerCase())
              }
            >
              <option value="FYBCS">FYBCS</option>
              <option value="SYBCS">SYBCS</option>
              <option value="TYBCS">TYBCS</option>
              <option value="FYMCS">FYMCS</option>
              <option value="SYMCS">SYMCS</option>
            </select>
            <input
              className="login-input"
              placeholder="Search student"
              value={searchDeleteStudent}
              onChange={(e) => setSearchDeleteStudent(e.target.value)}
            ></input>
          </div>
          <div className="student-container">
            {(searchDeleteStudent.length > 0
              ? studentListForDelete.filter(
                  (student) =>
                    student.roll_no === parseInt(searchDeleteStudent) ||
                    (
                      student.first_name +
                      student.middle_name +
                      student.last_name
                    ).includes(searchDeleteStudent)
                )
              : studentListForDelete
            )?.map((student) => {
              return (
                <div key={student._id} className="student">
                  <div className="student-name-container">
                    <span className="student-roll">{student.roll_no} </span>
                    <span className="student-name"> {student.first_name}</span>
                    <span className="student-name"> {student.middle_name}</span>
                    <span className="student-name"> {student.last_name} </span>
                  </div>
                  <button
                    className="btn"
                    onClick={() => deleteStudent(student)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <h2>Update Student</h2>
      <div className="admin-update-student">
        <div className="search-and-input-container">
          <select
            className="register-select"
            onChange={(e) => fetchStudentsForUpdate(e.target.value)}
          >
            <option value="FYBCS">FYBCS</option>
            <option value="SYBCS">SYBCS</option>
            <option value="TYBCS">TYBCS</option>
            <option value="FYMCS">FYMCS</option>
            <option value="SYMCS">SYMCS</option>
          </select>
          <input
            className="login-input"
            placeholder="Search student"
            value={searchUpdateStudent}
            onChange={(e) => setSearchUpdateStudent(e.target.value)}
          ></input>
        </div>
        <div className="student-container">
          {(searchUpdateStudent.length > 0
            ? studentListForUpdate.filter(
                (student) =>
                  student.roll_no === parseInt(searchUpdateStudent) ||
                  (
                    student.first_name +
                    student.middle_name +
                    student.last_name
                  ).includes(searchUpdateStudent)
              )
            : studentListForUpdate
          ).map((student) => {
            return <UpdateStudent student={student} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ModifyStudent;
