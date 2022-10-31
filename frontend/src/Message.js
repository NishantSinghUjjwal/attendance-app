import React from "react";

function Message({ error, showError }) {
  return (
    <div
      className={`message-container ${
        error.type ? "message-success" : "message-error"
      } ${showError ? "showMessage" : ""}`}
    >
      {error.message}
    </div>
  );
}

export default Message;
