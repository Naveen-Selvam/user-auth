import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";

function About(props) {
  const [data, setData] = useState({});
  const { login } = props;
  
  useEffect(() => {
    axios
      .get("https://dct-user-auth.herokuapp.com/users/account", {
        headers: { "x-auth": localStorage.getItem("token") },
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
        <Redirect to="/Login" />
      ) : (
        <div>
          {Object.keys(data).length > 0 && (
            <>
              <h1 style={{ textAlign: "center" }}>User Details</h1> <hr />
              <h3>User Name - {data.username}</h3>
              <h3>E-mail - {data.email}</h3>
              <h3>Created At - {data.createdAt}</h3>{" "}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default About;
