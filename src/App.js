import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import About from "./About";
import swal from "sweetalert";

const App = (props) => {
  const [registered, setRegistered] = useState(false);
  const [login, setLogin] = useState(false);

  const handleregister = () => {
    setRegistered(true);
  };
  const handleLogin = () => {
    setLogin(true);
  };
  const handleLogout = () => {
    localStorage.clear();
    setLogin(false);
    setRegistered(false);
    swal("You have logged out successfully");
  };

  return (
    <div>
      <div className="link">
        <Link to="/">Home</Link> |{" "}
        {login ? (
          <Link to="/About">About</Link>
        ) : (
          <Link to="/Register">Register</Link>
        )}{" "}
        |{" "}
        {login ? (
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <Link to="/Login">Login</Link>
        )}
      </div>

      <Route
        path="/"
        exact
        render={(props) => <Home login={login} {...props} />}
      />
      <Route
        path="/Register"
        exact
        render={(props) => (
          <Register handleregister={handleregister} {...props} />
        )}
      />
      <Route
        path="/Login"
        exact
        render={(props) => (
          <Login
            {...props}
            registered={registered}
            setRegistered={setRegistered}
            handleLogin={handleLogin}
          />
        )}
      />
      <Route
        path="/About"
        exact
        render={(props) => <About login={login} {...props} />}
      />
    </div>
  );
};

export default App;
