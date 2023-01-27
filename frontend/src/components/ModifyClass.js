import React from "react";
import { Link } from "react-router-dom";
const ModifyClass = () => {
  return (
    <div>
      <Link to="/">Go back</Link>
      <h1>Class Modification</h1>
      <div>
        <h2>Add Class</h2>
        <div>
          <input placeholder="classname"></input>
          <button>Add</button>
        </div>
      </div>
      <div>
        <h2>Delete Class</h2>
        <div>
          FYMCA <button>Delete</button>
        </div>
        <div>
          FYMCA <button>Delete</button>
        </div>
        <div>
          FYMCA <button>Delete</button>
        </div>
        <div>
          FYMCA <button>Delete</button>
        </div>
      </div>
      <div>
        <h2>Update Class</h2>
        <div>
          <input placeholder="FYBCS"></input>
          <button>Update</button>
        </div>
        <div>
          <input placeholder="FYBCS"></input>
          <button>Update</button>
        </div>
        <div>
          <input placeholder="FYBCS"></input>
          <button>Update</button>
        </div>
        <div>
          <input placeholder="FYBCS"></input>
          <button>Update</button>
        </div>
        <div>
          <input placeholder="FYBCS"></input>
          <button>Update</button>
        </div>
        <div>
          <input placeholder="FYBCS"></input>
          <button>Update</button>
        </div>
      </div>
    </div>
  );
};

export default ModifyClass;
