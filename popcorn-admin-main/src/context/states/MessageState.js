import React, { useState } from "react";
import MessageContext from "../context/MessageContext";

const MessageState = (props) => {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  const showMessage = (type, message) => {
    setType(type);
    setMessage(message);
  };
  setTimeout(() => {
    setMessage(null);
    setType(null);
  }, 5000);
  return (
    <MessageContext.Provider value={{ showMessage, message, type }}>
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageState;
