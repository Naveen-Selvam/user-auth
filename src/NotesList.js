import React, { useState } from "react";
import axios from "axios";
import DisplayItem from "./DisplayItem";
import { ImBin } from "react-icons/im";

function NotesList(props) {
  const [display, setDisplay] = useState(false);
  const [displayingData, setDisplayingData] = useState({});
  const { ele, toggleFunction } = props;

  const handleDelete = (id) => {
    let result = window.confirm("Are you sure");
    if (result) {
      axios
        .delete(`http://dct-user-auth.herokuapp.com/api/notes/${id}`, {
          headers: { "x-auth": localStorage.getItem("token") },
        }) 
        .then((response) => {
          toggleFunction();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleTitle = (id) => {
    axios
      .get(`http://dct-user-auth.herokuapp.com/api/notes/${id}`, {
        headers: { "x-auth": localStorage.getItem("token") },
      })
      .then((response) => {
        setDisplay(!display);
        setDisplayingData(response.data);
      });
  };

  return (
    <div>
      <h2 onClick={() => handleTitle(ele._id)}>{ele.title}</h2>
      <ImBin
        style={{ cursor: "pointer" }}
        onClick={() => handleDelete(ele._id)}
      />

      {display && (
        <DisplayItem displayingData={displayingData} display={display} />
      )}
    </div>
  );
}

export default NotesList;
