import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Navbar({ icon, title }) {
  return (
    <nav className="navbar  bg-primary">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <i style={{ fontSize: 28 }} className={icon} />
        <h1 style={{ marginLeft: 5 }}> {title}</h1>
      </div>
      <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
    </nav>
  );
}

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
