import React, { useEffect } from "react";
import { Fragment } from "react";
import { Spinner } from "../../layout/Spinner";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import Repos from "../repose/Repos";

const User = ({ user, loading, repos, getUser, getUserRepos, match }) => {
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    company,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        {" "}
        Back to search{" "}
      </Link>
      Hireable : {""}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            alt="images"
            style={{ width: 150 }}
          />
          <h1> {name} </h1>
          <p> location: {location} </p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3> Bio </h3>
              <p> {bio} </p>
            </Fragment>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit Github profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong> User Name : </strong> {login}
                </Fragment>
              )}
            </li>
          </ul>

          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong> Company : </strong> {company}
                </Fragment>
              )}
            </li>
          </ul>

          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong> Website : </strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers : {followers}</div>
        <div className="badge badge-success">Following : {following}</div>
        <div className="badge badge-light">Public Repos : {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

User.propTypes = {
  loading: propTypes.bool,
  user: propTypes.object.isRequired,
  repos: propTypes.array.isRequired,
  getUser: propTypes.func.isRequired,
  getUserReposS: propTypes.func.isRequired,
};

export default User;
