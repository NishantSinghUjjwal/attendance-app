import React from "react";

function Message({ error }) {
  return <div>{error.message}</div>;
}

export default Message;
