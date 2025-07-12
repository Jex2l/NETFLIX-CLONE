import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../css/Footer.css";
import ModeContext from "../../context/Contexts/ModeContext";
const Footer = () => {
  const lightStyle = {
    backgroundColor: "#eeeff0",
    color: "black",
  };
  const darkStyle = {
    backgroundColor: "black",
    color: "white",
  };
  const mode = useContext(ModeContext);
  return (
    <>
      <div
        className="footer-main"
        style={mode.checked === false ? darkStyle : lightStyle}
      >
        <div className="footer-part-1 footer">
          <h1>
            <Link
              to="/"
              className="footer-links"
              style={mode.checked === false ? darkStyle : lightStyle}
            >
              POPCORN
            </Link>
          </h1>
        </div>
        <div className="footer-part-2 footer">
          <ul>
            <li className="footer-right-border">
              <Link
                to="/"
                className="footer-links"
                style={mode.checked === false ? darkStyle : lightStyle}
              >
                Privacy Policy
              </Link>
            </li>
            <li className="footer-right-border">
              <Link
                to="/"
                className="footer-links"
                style={mode.checked === false ? darkStyle : lightStyle}
              >
                Terms and Conditions
              </Link>
            </li>
            <li className="footer-right-border">
              <Link
                to="/"
                className="footer-links"
                style={mode.checked === false ? darkStyle : lightStyle}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="footer-links"
                style={mode.checked === false ? darkStyle : lightStyle}
              >
                Pricing
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-part-3 footer">
          <ul>
            <li>
              <Link
                to="/"
                className="footer-links"
                style={mode.checked === false ? darkStyle : lightStyle}
              >
                <i className="fa-brands fa-facebook fa-2xl"></i>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="footer-links"
                style={mode.checked === false ? darkStyle : lightStyle}
              >
                <i className="fa-brands fa-instagram fa-2xl"></i>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="footer-links"
                style={mode.checked === false ? darkStyle : lightStyle}
              >
                <i className="fa-brands fa-twitter fa-2xl"></i>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="footer-links"
                style={mode.checked === false ? darkStyle : lightStyle}
              >
                <i className="fa-brands fa-youtube fa-2xl"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
