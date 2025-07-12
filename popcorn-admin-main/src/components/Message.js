import { Alert } from "@mui/material";
import React, { useContext } from "react";
import MessageContext from "../context/context/MessageContext";

const Message = (props) => {
  const { message, type } = useContext(MessageContext);
  return message === null ? null : <Alert severity={type}>{message}</Alert>;
};

export default Message;
