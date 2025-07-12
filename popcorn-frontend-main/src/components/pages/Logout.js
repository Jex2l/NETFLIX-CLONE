import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("key");
    localStorage.removeItem("id");
    navigate("/");
    window.location.reload(false);
    // eslint-disable-next-line
  }, []);

  return <></>;
};

export default Logout;
