import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import NotesForm from "./NotesForm";
import NotesList from "./NotesList";
import swal from "sweetalert";
import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

function MyNotes(props) {
  const [notes, setNotes] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { login } = props;

  useEffect(() => {
    axios
      .get("http://dct-user-auth.herokuapp.com/api/notes", {
        headers: { "x-auth": localStorage.getItem("token") },
      })
      .then((response) => {
        let result = response.data;
        console.log(result);

        let reverseValue = [...result].reverse();
        setNotes(reverseValue);
      })
      .catch((err) => {
        swal("Login First");
      });
  }, [toggle]);

  const toggleFunction = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <FormWrapper>
        {!login ? (
          <div>
            <p style={{ textAlign: "center", color: "red" }}>Login first</p>
            <Redirect to="/login" />
          </div>
        ) : (
          <div>
            <h2>My-Notes</h2>
            {notes.length === 0 ? (
              <h4>No Notes found add your first note</h4>
            ) : (
              <h4>
                My Your notes - {notes.length}
                {notes.map((ele) => {
                  return (
                    <NotesList
                      key={ele._id}
                      ele={ele}
                      toggleFunction={toggleFunction}
                    />
                  );
                })}
              </h4>
            )}
            <div>
              <NotesForm toggleFunction={toggleFunction} />
            </div>
          </div>
        )}
      </FormWrapper>
    </div>
  );
}

export default MyNotes;
