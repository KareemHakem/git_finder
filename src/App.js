import React from "react";
import Navbar from "./layout/Navbar/Navbar";
import Search from "./components/search/Search";
import Alert from "./layout/Alert/Alert";
import About from "./components/pages/About";
import { Users as MainUsers } from "./components/users/Users";
import { Switch, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./App.css";

const REACT_APP_GITHUB_CLIENT_ID = "61f13829ed33919aacde";

const REACT_APP_GITHUB_CLIENT_SECRET =
  "f2e74e4be1d7f94c2a871e1d5b8ffc7795f90cac";

const App = () => {
  const [Users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // search github users
  const SearchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUsers(res.data.items);
    setLoading(false);
  };

  //get single github user
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUser(res.data);
    setLoading(false);
  };

  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(res.data);
    setLoading(false);
  };

  const clearUsers = () => {
    setUser([]);
    setLoading(false);
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });

    setTimeout(() => setAlert(null), 5000);
  };

  // const HomePage = ({
  //   alert,
  //   SearchUsers,
  //   clearUsers,
  //   users,
  //   loading,
  //   showAlert,
  // }) => {
  //   return (
  //     <>
  //       <Alert alert={alert} />
  //       <Search
  //         SearchUsers={SearchUsers}
  //         clearUsers={clearUsers}
  //         showClear={users.length > 0 ? true : false}
  //         setAlert={showAlert}
  //       />
  //       {/* <Users loading={loading} users={users} />  */}
  //     </>
  //   );
  // };

  return (
    <div>
      <Navbar />
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Search
                SearchUsers={SearchUsers}
                clearUsers={clearUsers}
                setAlert={showAlert}
                loading={loading}
                Alert={Alert}
              />
            )}
          />
          <Route exact path="/about" component={About} />
          <Route
            exact
            path="/user/:login"
            render={(props) => (
              <Users
                {...props}
                getUser={getUser}
                getUserRepos={getUserRepos}
                user={user}
                repos={repos}
                loading={loading}
              />
            )}
          />
        </Switch>
      </div>

      <MainUsers loading={loading} users={Users} />
    </div>
  );
};

export default App;
