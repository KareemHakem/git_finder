import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function UserItem({ user: { avatar_url, login, html_url } }) {
  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt="img"
        className="round-img"
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>
      <div>
        <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">
          More
        </Link>
      </div>
    </div>
  );
}

UserItem.prototype = {
  user: PropTypes.object.isRequired,
};

export default UserItem;

// REACT_APP_GITHUB_CLIENT_ID ='a50ff008dbf4fb04b820'
// REACT_APP_GITHUB_CLIENT_SECRET ='f2e74e4be1d7f94c2a871e1d5b8ffc7795f90cac'
