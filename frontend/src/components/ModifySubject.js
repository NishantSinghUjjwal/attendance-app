import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalAdminContext } from "./adminContext";
const ModifySubject = () => {
  const {
    subject,
    setSubject,
    addSubject,
    subjectListForUpdate,
    fetchSubjectsForUpdate,
    editSubject,
  } = useGlobalAdminContext();

  const [searchedSubject, setSearchedSubject] = useState("");

  const [updatedSubject, setUpdatedSubject] = useState({
    sub_name: "",
    sub_code: "",
    sub_class: "fybcs",
  });

  const handleUpdateSubject = (e) => {
    setUpdatedSubject((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubject = (e) => {
    setSubject((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    fetchSubjectsForUpdate();
  }, []);
  return (
    <div>
      <Link className="link" to="/">
        Go back
      </Link>
      <h1>Subject Modification</h1>
      <div>
        <h2>Add Subject</h2>
        <div className="admin-add-student">
          <select
            className="register-select"
            name="sub_class"
            onChange={handleSubject}
          >
            <option value="FYBCS">FYBCS</option>
            <option value="SYBCS">SYBCS</option>
            <option value="TYBCS">TYBCS</option>
            <option value="FYMCS">FYMCS</option>
            <option value="SYMCS">SYMCS</option>
          </select>
          <input
            className="login-input"
            placeholder="subject name"
            value={subject.sub_name}
            onChange={handleSubject}
            name="sub_name"
          ></input>
          <input
            className="login-input"
            placeholder="subject code"
            value={subject.sub_code}
            onChange={handleSubject}
            name="sub_code"
          ></input>

          <button className="btn" onClick={addSubject}>
            Add
          </button>
        </div>
      </div>

      <h2>Update Subject</h2>
      <div className="admin-delete-subject">
        <div className="search-and-input-container">
          <input
            placeholder="search subject"
            className="login-input"
            value={searchedSubject}
            onChange={(e) => setSearchedSubject(e.target.value)}
          ></input>
        </div>
        <div className="student-container">
          {(searchedSubject.length > 0
            ? subjectListForUpdate.filter((sub) =>
                sub.sub_name.includes(searchedSubject)
              )
            : subjectListForUpdate
          ).map((subject) => (
            <div>
              <input
                name="sub_name"
                type="text"
                placeholder={subject.sub_name}
                onChange={handleUpdateSubject}
              ></input>
              <input
                name="sub_code"
                type="text"
                placeholder={subject.sub_code}
                onChange={handleUpdateSubject}
              ></input>
              <input
                name="sub_class"
                type="text"
                placeholder={subject.sub_class}
                onChange={handleUpdateSubject}
              ></input>
              <button
                onClick={() => editSubject(updatedSubject, subject.sub_code)}
              >
                Update
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModifySubject;
