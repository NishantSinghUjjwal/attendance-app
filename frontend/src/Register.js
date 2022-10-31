import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
function Register({ sendRegister }) {
  const [userData, setUserData] = useState({
    username: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    password: "",
    subject: "",
  });
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
  const handleRegister = (e) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="register-container">
      <div className="register-main">
        <h1 className="login-heading">Register</h1>
        <input
          className="login-input input"
          name="username"
          placeholder="Username"
          onChange={(e) => handleRegister(e)}
          value={userData.username}
        ></input>
        <input
          className="login-input input"
          name="first_name"
          placeholder="Firstname"
          onChange={(e) => handleRegister(e)}
          value={userData.first_name}
        ></input>
        <input
          className="login-input input"
          name="middle_name"
          placeholder="Middlename"
          onChange={(e) => handleRegister(e)}
          value={userData.middle_name}
        ></input>
        <input
          className="login-input input"
          name="last_name"
          placeholder="Lastname"
          onChange={(e) => handleRegister(e)}
          value={userData.last_name}
        ></input>
        <input
          className="login-input input"
          name="password"
          placeholder="Password"
          onChange={(e) => handleRegister(e)}
          value={userData.password}
        ></input>

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
              <li
                name="subject"
                onClick={(e) =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      subject: [...prev.subject, e.target.textContent],
                    };
                  })
                }
                key={index}
              >
                {subject}
              </li>
            ))}
          </ul>
        </div>
        <button className="btn" onClick={() => sendRegister(userData)}>
          Register
        </button>
        <p className="suggestion">
          Already a Teacher?<Link to="/login">Login as Teacher</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
