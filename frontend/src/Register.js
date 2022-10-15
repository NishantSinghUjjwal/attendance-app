import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
function Register() {
  const subList = [
    "Web Frameworks",
    "Software Development and Programming",
    "Machine Learning",
    "System Programming",
    "Advanced Operating System",
    "Paradigms of Programming Language",
    "Internet Programming",
    "Mobile Technologies",
  ];
  const [searchedSub, setSearchedSub] = useState([]);
  //   const [subject, setSubject] = useState("");
  const [dropdown, setDropDown] = useState(true);
  function handleSearch(e) {
    if (e.target.value.length > 0) {
      const newList = subList.filter((subject) =>
        subject.startsWith(e.target.value[0].toUpperCase() || e.target.value)
      );
      setSearchedSub(newList);
      setDropDown(false);
    } else {
      setSearchedSub([]);
      setDropDown(true);
    }
  }
  return (
    <div className="login-container">
      <h1 className="login-heading">Register</h1>
      <input className="login-input input" placeholder="Username"></input>
      <input className="login-input input" placeholder="Password"></input>
      <div className="register-search-subject-container">
        <BiSearch className="search-icon" />
        <input
          className="register-search-subject"
          placeholder="Search Subject"
          onChange={(e) => handleSearch(e)}
        ></input>
      </div>
      <div className="register-search-dropdown">
        <ul className={dropdown ? "dropdown-close" : ""}>
          {searchedSub.map((subject, index) => (
            <li key={index}>{subject}</li>
          ))}
        </ul>
      </div>
      <button className="btn">Register</button>
      <p className="suggestion">
        Already a Teacher?<a>Login as Teacher</a>
      </p>
    </div>
  );
}

export default Register;
