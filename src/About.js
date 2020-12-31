import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";

function About(props) {
  const [data, setData] = useState({});
  const { login } = props;

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://dct-user-auth.herokuapp.com/users/account", {
        headers: { "x-auth": token },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        swal("Login First");
      });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      {!login ? (
        <div>
          <p style={{ textAlign: "center", color: "red" }}>Login first</p>
          <Redirect to="/Login" />
        </div>
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>About</h1> <hr />
          <h3>User Name - {data.username}</h3>
          <h3>E-mail - {data.email}</h3>
          <h3>Created At - {data.createdAt}</h3>
        </div>
      )}
    </div>
  );
}

export default About;
