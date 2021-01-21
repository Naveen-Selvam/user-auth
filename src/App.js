import React, { useState } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import About from "./About";
import swal from "sweetalert";
import MyNotes from "./MyNotes";
import { ImHome } from "react-icons/im";
import { VscAccount } from "react-icons/vsc";

const LinkeWrapper = styled.div`
  width: 100vw;
  height: 50px;
  background: blue;
  color: black;
  font-size: 1.5rem;
  font-family: sans-serif;
  font-weight: bold;
  display: flex;
  justify-content: flex-end;
`;
const Navlink = styled(Link)`
  color: black;
  margin: 10px; 
  text-decoration: none;
  padding-right: 10px;
`;
const App = (props) => {
  const [login, setLogin] = useState(localStorage.getItem("token") || false);

  const handleLogin = () => {
    setLogin(!login);
  };

  const handleLogout = () => {
    localStorage.clear();
    setLogin(false);
    swal("You have logged out successfully");
  };

  return (
    <div>
      <LinkeWrapper>
        <Navlink to="/">
          <ImHome /> Home
        </Navlink>
        {login ? (
          <>
            <Navlink to="/About">About</Navlink>

            <Navlink to="mynotes">My Notes</Navlink>

            <Navlink to="/" onClick={handleLogout}>
              <VscAccount />
              Logout
            </Navlink>
          </>
        ) : (
          <>
            <Navlink to="/Register">Register</Navlink>

            <Navlink to="/Login">Login</Navlink>
          </>
        )}
      </LinkeWrapper>
      <Route
        path="/"
        exact
        render={(props) => <Home login={login} {...props} />}
      />
      <Route
        path="/Register"
        exact
        render={(props) =>
          login ? (
            <Redirect
              to={{
                pathname: "/",
                state: true,
              }}
            />
          ) : (
            <Register {...props} />
          )
        }
      />
      <Route
        path="/Login"
        exact
        render={(props) =>
          login ? (
            <Redirect to="/" />
          ) : (
            <Login {...props} login={login} handleLogin={handleLogin} />
          )
        }
      />
      <Route
        path="/About"
        exact
        render={(props) => <About login={login} {...props} />}
      />
      <Route
        exact
        path="/mynotes"
        render={(props) => <MyNotes login={login} {...props} />}
      />
    </div>
  );
};

export default App;
