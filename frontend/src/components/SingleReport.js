import React from "react";
import { useGlobalContext } from "./context";
import PieChart from "./PieChart";

const SingleReport = ({ student, setShowModal }) => {
  const {
    handleStudentReport,
    report,
    toSendForReportData,
    setToSendForReportData,
  } = useGlobalContext();
  const handleInputChange = (e) => {
    setToSendForReportData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  console.log(student.roll_no);
  return (
    <div className="singleReport">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <input
          className="login-input"
          type="text"
          placeholder="enter year"
          value={toSendForReportData.year}
          onChange={handleInputChange}
          name="year"
        ></input>
        <input
          className="login-input"
          type="text"
          placeholder="enter month"
          value={toSendForReportData.month}
          onChange={handleInputChange}
          name="month"
        ></input>
        <input
          className="login-input"
          type="text"
          placeholder="enter sub code"
          value={toSendForReportData.sub}
          onChange={handleInputChange}
          name="sub"
        ></input>
        <button
          className="btn"
          onClick={() => handleStudentReport(student.roll_no)}
        >
          Submit
        </button>
        <button className="close-btn" onClick={() => setShowModal(false)}>
          x
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {report ? <PieChart chartData={report} /> : "No Data To Show"}
      </div>
    </div>
  );
};

export default SingleReport;
