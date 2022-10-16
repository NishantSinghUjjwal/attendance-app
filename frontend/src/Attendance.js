import React from "react";
import Student from "./Student";
function Attendance() {
  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <input className="attendance-input" type="date"></input>
        <select className="attendance-input year">
          <option>F.Y B.C.S</option>
          <option>S.Y B.C.S</option>
          <option>T.Y B.C.S</option>
          <option>F.Y M.C.S</option>
          <option>S.Y M.C.S</option>
        </select>
        <select className="attendance-input subject">
          <option>Web FrameWorks</option>
          <option>Web FrameWorks</option>
          <option>Web FrameWorks</option>
          <option>Web FrameWorks</option>
        </select>
      </div>
      <div className="attendance-main">
        <Student />
        <Student />
        <Student />
        <Student />
        <Student />
        <Student />
        <Student />
        <Student />
        <Student />
        <Student />
        <Student />
        <Student />
        <Student />
      </div>
      <button className="btn take-attendance">Take Attendance</button>
    </div>
  );
}

export default Attendance;
