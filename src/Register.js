import React from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import TextError from "./TextError";
import { Link } from "react-router-dom";

function Register(props) {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  }; 
  const validationSchema = yup.object({
    username: yup.string().min(5).required("cannot be blank"),
    email: yup
      .string() 
      .email("Invalid email Format")
      .required("cannot be blank"),
    password: yup.string().min(8).max(128).required("cannot be blank"),
  });
  const onSubmit = (values, onSubmitProps) => {
    axios
      .post("https://dct-user-auth.herokuapp.com/users/register", values)
      .then((response) => {
        props.history.push("/Login", "Registered Successfully");
        onSubmitProps.resetForm();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div>
      <h1 className="register">Register With Us</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="form-control">
            <Field name="username" type="text" placeholder="User Name" />
            <ErrorMessage name="username" component={TextError} /> <br />
          </div>
          <div className="form-control">
            <Field name="email" type="text" placeholder="E-mail" />
            <ErrorMessage name="email" component={TextError} /> <br />
          </div>
          <div className="form-control">
            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" component={TextError} /> <br />
          </div>
          <div className="form-control">
            <Field
              className="btn"
              type="submit"
              value="Register"
              name="submit"
            />{" "}
            <button className="btn" type="reset">
              cancel
            </button>
          </div>
        </Form>
      </Formik>
      {
        <p style={{ textAlign: "center" }}>
          Already have an Account <Link to="/Login">Login</Link>
        </p>
      }
    </div>
  );
}

export default Register;
