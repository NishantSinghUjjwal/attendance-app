import React, { useContext, useEffect, useState } from "react";
const AdminAppContext = React.createContext();
const AdminAppProvider = ({ children }) => {
  const [studentToAdd, setStudentToAdd] = useState({
    std_class: "fybcs",
    year: "",
    roll_no: "",
    first_name: "",
    middle_name: "",
    last_name: "",
  });

  const [studentListForDelete, setStudentListForDelete] = useState([]);
  const [studentListForUpdate, setStudentListForUpdate] = useState([]);

  const [searchDeleteStudent, setSearchDeleteStudent] = useState("");
  const [searchUpdateStudent, setSearchUpdateStudent] = useState("");

  const [subjectListForDelete, setSubjectListForDelete] = useState([]);
  const [subjectListForUpdate, setSubjectListForUpdate] = useState([]);

  const [subject, setSubject] = useState({
    sub_name: "",
    sub_code: "",
    sub_class: "fybcs",
  });

  const addStudent = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/student/add-Student",
        {
          method: "POST",
          body: JSON.stringify({
            ...studentToAdd,
            std_class: studentToAdd.std_class.toLowerCase(),

            year: new Date().getFullYear(),
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
      fetchStudentsForDelete("fybcs");
      fetchStudentsForUpdate("fybcs");
      console.log("result is: ", JSON.stringify(result, null, 4));
    } catch (err) {
      console.log(err);
    }
  };
  const fetchStudentsForDelete = async (sclass) => {
    try {
      const response = await fetch(
        "http://localhost:4000/student/fetch-by-class",
        {
          method: "POST",
          body: JSON.stringify({
            std_class: sclass.toLowerCase(),
            year: new Date().getFullYear(),
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
      setStudentListForDelete(result.payload);
      console.log("result is: ", JSON.stringify(result, null, 4));
    } catch (err) {
      console.log(err);
    }
  };
  const fetchStudentsForUpdate = async (sclass) => {
    try {
      const response = await fetch(
        "http://localhost:4000/student/fetch-by-class",
        {
          method: "POST",
          body: JSON.stringify({
            std_class: sclass.toLowerCase(),
            year: new Date().getFullYear(),
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
      setStudentListForUpdate(result.payload);
      console.log("result is: ", JSON.stringify(result, null, 4));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteStudent = async (student) => {
    try {
      const response = await fetch(
        "http://localhost:4000/student/delete-Student",
        {
          method: "POST",
          body: JSON.stringify({
            std_class: student.std_class,
            roll_no: student.roll_no,
            year: student.year,
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
      setStudentListForDelete(result.payload);
      console.log("result is: ", JSON.stringify(result, null, 4));
    } catch (err) {
      console.log(err);
    }
  };
  const editStudent = async (updatedStudent) => {
    console.log(updatedStudent);
    try {
      const response = await fetch(
        "http://localhost:4000/student/edit-Student",
        {
          method: "POST",
          body: JSON.stringify({
            std_class: updatedStudent.std_class,
            year: updatedStudent.year,
            roll_no: updatedStudent.roll_no,
            changes: {
              first_name: updatedStudent.first_name,
              middle_name: updatedStudent.middle_name,
              last_name: updatedStudent.last_name,
            },
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
      setStudentListForUpdate(result.payload);
      console.log("result is: ", JSON.stringify(result, null, 4));
    } catch (err) {
      console.log(err);
    }
  };
  const addSubject = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/subject/add-subject",
        {
          method: "POST",
          body: JSON.stringify({
            ...subject,
            sub_class: subject.sub_class.toLowerCase(),
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
      fetchSubjectsForUpdate();
      console.log("result is: ", JSON.stringify(result, null, 4));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSubjectsForUpdate = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/subject/fetch-subject-list"
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      setSubjectListForUpdate(result.payload);
      console.log("result is: ", JSON.stringify(result, null, 4));
    } catch (err) {
      console.log(err);
    }
  };

  const editSubject = async (subject, code) => {
    // console.log(sub_name, sub_code, sub_class);
    try {
      const response = await fetch(
        "http://localhost:4000/subject/edit-subject",
        {
          method: "POST",
          body: JSON.stringify({
            code: code,
            changes: {
              sub_name: subject.sub_name,
              sub_code: subject.sub_code,
              sub_class: subject.sub_class,
            },
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
      setSubjectListForUpdate(result.payload);
      fetchSubjectsForUpdate();
      console.log("result is: ", JSON.stringify(result, null, 4));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchStudentsForDelete("fybcs");
    fetchStudentsForUpdate("fybcs");
  }, []);

  return (
    <AdminAppContext.Provider
      value={{
        studentToAdd,
        setStudentToAdd,
        addStudent,
        studentListForDelete,
        fetchStudentsForDelete,
        deleteStudent,
        searchDeleteStudent,
        setSearchDeleteStudent,
        setStudentListForUpdate,
        editStudent,
        fetchStudentsForUpdate,
        studentListForUpdate,
        searchUpdateStudent,
        setSearchUpdateStudent,
        subject,
        setSubject,
        addSubject,
        subjectListForDelete,
        subjectListForUpdate,
        fetchSubjectsForUpdate,
        editSubject,
      }}
    >
      {children}
    </AdminAppContext.Provider>
  );
};
export const useGlobalAdminContext = () => {
  return useContext(AdminAppContext);
};
export { AdminAppProvider };
