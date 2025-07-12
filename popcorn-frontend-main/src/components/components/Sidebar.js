import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../css/Sidebar.css";
import ModeContext from "../../context/Contexts/ModeContext";
const Menu = () => {
  const mode = useContext(ModeContext);
  const lightStyle = {
    backgroundColor: "#f6f7f9",
    color: "black",
  };
  const darkStyles = {
    backgroundColor: "#1c212e",
    color: "white",
  };
  return (
    <>
      <div
        className="main-menu"
        style={mode.checked === false ? darkStyles : lightStyle}
      >
        <div className="menu-part-1">
          <div className="menu-part-1-header">
            <h3>Popular Categories</h3>
          </div>
          <hr className="hr-1" />
          <ul
            className="menu-part-1-menus"
            style={mode.checked === false ? darkStyles : lightStyle}
          >
            <li className="menus">
              <Link
                style={mode.checked === false ? darkStyles : lightStyle}
                to="/filter/most-liked"
                className="sidebar-links"
              >
                <i className="fa-solid fa-thumbs-up"></i>
                &nbsp;&nbsp;&nbsp;Most Liked
              </Link>
            </li>
            <li className="menus">
              <Link
                style={mode.checked === false ? darkStyles : lightStyle}
                to="/filter/most-viewed"
                className="sidebar-links"
              >
                <i className="fa-solid fa-eye"></i>&nbsp;&nbsp;&nbsp;Most Viewed
              </Link>
            </li>
          </ul>
        </div>
        <div className="menu-part-2">
          <div className="menu-part-2-header">
            <h3>Movies Genres</h3>
          </div>
          <hr className="hr-1" />
          <ul className="menu-part-2-menus">
            <Link
              style={mode.checked === false ? darkStyles : lightStyle}
              to="/filter/action"
              className="sidebar-links"
            >
              <li className="menus">Action</li>
            </Link>
            <Link
              style={mode.checked === false ? darkStyles : lightStyle}
              to="/filter/advanture"
              className="sidebar-links"
            >
              <li className="menus">Advanture</li>
            </Link>
            <Link
              style={mode.checked === false ? darkStyles : lightStyle}
              to="/filter/animated"
              className="sidebar-links"
            >
              <li className="menus">Animated</li>
            </Link>
            <Link
              style={mode.checked === false ? darkStyles : lightStyle}
              to="/filter/comedy"
              className="sidebar-links"
            >
              <li className="menus">Comedy</li>
            </Link>
            <Link
              style={mode.checked === false ? darkStyles : lightStyle}
              to="/filter/crime"
              className="sidebar-links"
            >
              <li className="menus">Crime</li>
            </Link>
            <Link
              style={mode.checked === false ? darkStyles : lightStyle}
              to="/filter/drama"
              className="sidebar-links"
            >
              <li className="menus">Drama</li>
            </Link>
            <Link
              style={mode.checked === false ? darkStyles : lightStyle}
              to="/filter/horror"
              className="sidebar-links"
            >
              <li className="menus">Horror</li>
            </Link>
            <Link
              style={mode.checked === false ? darkStyles : lightStyle}
              to="/filter/sci-fi"
              className="sidebar-links"
            >
              <li className="menus">Sci-Fi</li>
            </Link>
            <Link
              style={mode.checked === false ? darkStyles : lightStyle}
              to="/filter/thriller"
              className="sidebar-links"
            >
              <li className="menus">Thriller</li>
            </Link>
          </ul>
        </div>
        <div className="menu-part-3">
          <div className="menu-part-3-header">
            <h3>Movies/TV-Series Years</h3>
          </div>
          <hr className="hr-1" />
          <ul className="menu-part-3-menus">
            <Link
              style={mode.checked === false ? darkStyles : lightStyle}
              to="/filter/latest"
              className="sidebar-links"
            >
              <li className="menus">Latest</li>
            </Link>
            <Link
              style={mode.checked === false ? darkStyles : lightStyle}
              to={`/filter/${2020}`}
              className="sidebar-links"
            >
              <li className="menus">2020</li>
            </Link>
            <Link
              style={mode.checked === false ? darkStyles : lightStyle}
              to="/filter/2019"
              className="sidebar-links"
            >
              <li className="menus">2019</li>
            </Link>
            <Link
              style={mode.checked === false ? darkStyles : lightStyle}
              to="/filter/2018"
              className="sidebar-links"
            >
              <li className="menus">2018</li>
            </Link>
            <Link
              style={mode.checked === false ? darkStyles : lightStyle}
              to="/filter/2017"
              className="sidebar-links"
            >
              <li className="menus">2017</li>
            </Link>
            <Link
              style={mode.checked === false ? darkStyles : lightStyle}
              to="/filter/2016"
              className="sidebar-links"
            >
              <li className="menus">2016</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Menu;
