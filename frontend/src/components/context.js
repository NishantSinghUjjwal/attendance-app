import React, { useContext, useEffect, useState } from "react";
import Error from "./Error";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [showMessage, setShowMessage] = useState(false);

  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const [registerData, setRegisterData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    username: "",
    password: "",
    subject: "",
  });

  const [subjectList, setSubjectList] = useState([]);

  const [userData, setUserData] = useState([]);

  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLoggedIn") || false
  );

  const [isRegister, setIsRegister] = useState(false);

  const [loading, setLoading] = useState(false);

  const [studentList, setStudentList] = useState([]);

  const [todayAttendance, setTodayAttendance] = useState([]);

  const [searchedStudent, setSearchedStudent] = useState("");

  const [report, setReport] = useState(null);

  const [toSendForReportData, setToSendForReportData] = useState({
    year: "",
    sub: "",
    month: "",
  });

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/user/fetch-user-data",
        {
          method: "POST",
          body: JSON.stringify({ username: loginData.username }),
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
      setUserData(result.payload);
      console.log("result is: ", JSON.stringify(result, null, 4));
    } catch (err) {
      console.log(err);
    }
  };
  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:4000/user/register", {
        method: "POST",
        body: JSON.stringify(registerData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        setIsRegister(true);
      }
      console.log("result is: ", JSON.stringify(result, null, 4));
    } catch (err) {
      console.log(err);
      // alert("Register Failed");
      setShowMessage(true);
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response1 = await fetch("http://localhost:4000/token/fetch-token", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const tokenResponse = await response1.json();
      console.log(tokenResponse.payload.token);
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${tokenResponse.payload.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.payload.allow_login) {
        localStorage.setItem("isLoggedIn", true);
        setIsLogin(localStorage.getItem("isLoggedIn"));
      }
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      console.log("result is: ", result);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const fetchStudents = async (sclass) => {
    try {
      const response1 = await fetch("http://localhost:4000/token/fetch-token", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const tokenResponse = await response1.json();
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
            Authorization: `Bearer ${tokenResponse.payload.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("result is: ", JSON.stringify(result, null, 4));
      setStudentList(result.payload);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAttendance = async () => {
    const presentArr = [];
    const absentArr = [];
    todayAttendance.map((student) => {
      if (student.present) {
        presentArr.push(student.roll_no);
      } else {
        absentArr.push(student.roll_no);
      }
    });
    try {
      const response1 = await fetch("http://localhost:4000/token/fetch-token", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const tokenResponse = await response1.json();
      const response = await fetch(
        "http://localhost:4000/attendance/add-attendance",
        {
          method: "POST",
          body: JSON.stringify({
            att_date: new Date(),
            att_class: "fybcs",
            att_subject: 104,
            attendance: {
              present: presentArr,
              absent: absentArr,
            },
            att_year: "2023",
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${tokenResponse.payload.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      setShowMessage(true);
      const result = await response.json();
      console.log("result is: ", JSON.stringify(result, null, 4));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/subject/fetch-subject-list"
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      setSubjectList(result.payload);
      console.log("result is: ", JSON.stringify(result, null, 4));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStudentReport = async (roll_no) => {
    try {
      const response = await fetch(
        "http://localhost:4000/attendance/fetch-attendance-report",
        {
          method: "POST",
          body: JSON.stringify({
            roll: roll_no,
            year: toSendForReportData.year,
            month: toSendForReportData.month,
            sub: toSendForReportData.sub,
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

      setReport(result.payload);
      console.log("result is: ", JSON.stringify(result, null, 4));
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLogin(false);
  };
  useEffect(() => {
    fetchSubjects();
  }, []);
  return (
    <AppContext.Provider
      value={{
        userData,
        fetchUserDetails,
        subjectList,
        setLoginData,
        loginData,
        setRegisterData,
        registerData,
        handleLogin,
        handleRegister,
        isLogin,
        isRegister,
        loading,
        fetchStudents,
        studentList,
        todayAttendance,
        setTodayAttendance,
        handleAttendance,
        searchedStudent,
        setSearchedStudent,

        handleLogout,
        showMessage,
        handleStudentReport,
        report,
        toSendForReportData,
        setToSendForReportData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppProvider };
