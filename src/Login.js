import React, { useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import TextError from "./TextError";

function Login(props) {
  const { handleLogin } = props;
  const { registered, setRegistered } = props;
  const [loginError, setLoginError] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };
  const validataionSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email Format")
      .required("cannot be blank"),
    password: yup.string().required("cannot be blank"),
  });
  const onSubmit = (values, onSubmitProps) => {
    axios
      .post("https://dct-user-auth.herokuapp.com/users/login", values)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          handleLogin();
          props.history.push("/");
        } else {
          setLoginError(response.data.errors);
          setRegistered(false);
          console.log(registered);
        }
        console.log(registered);
      })
      .catch((err) => {
        alert(err.message);
      });
    onSubmitProps.restForm();
  };

  return (
    <div>
      {registered ? (
        <h4 style={{ textAlign: "center", color: "green" }}>
          You have registered successfully
        </h4>
      ) : (
        ""
      )}
      {loginError && (
        <h4 style={{ textAlign: "center", color: "red" }}>{loginError}</h4>
      )}

      <h1 style={{ textAlign: "center" }}>Login to your account</h1>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validataionSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="form-control">
              <Field type="text" name="email" placeholder="E-mail" />
              <ErrorMessage name="email" component={TextError} /> <br />
            </div>
            <div className="form-control">
              <Field type="password" name="password" placeholder="password" />
              <ErrorMessage name="password" component={TextError} />
              <br />
            </div>
            <div className="form-control">
              <Field type="submit" className="btn" value="Login" />{" "}
              <button className="btn" type="reset">
                cancel
              </button>
            </div>
          </Form>
        </Formik>
        {
          <p style={{ textAlign: "center" }}>
            click here to <Link to="/Register">register</Link>
          </p>
        }
      </div>
    </div>
  );
}

export default Login;
