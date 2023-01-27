import React from "react";

const Error = ({ message, type }) => {
  return <div className={`error error-${type}`}>{message}</div>;
};

export default Error;
