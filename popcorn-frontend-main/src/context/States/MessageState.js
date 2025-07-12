import React, { useState } from "react";
import MessageContext from "../Contexts/MessageContext";

const MessageState = (props) => {
  const [messageType, setMessageType] = useState(null);
  const [message, setMessage] = useState(null);
  const showMessage = (type, message) => {
    setMessageType(type);
    setMessage(message);
  };
  if (message !== null) {
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }
  return (
    <MessageContext.Provider value={{ messageType, message, showMessage }}>
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageState;
