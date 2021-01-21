import React, { useState } from "react";
import axios from "axios";

function NotesForm(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(false);
  const { toggleFunction } = props;

  const handleChange = (e) => {
    if (e.target.name === "title") { 
      setTitle(e.target.value);
    } else if (e.target.name === "body") {
      setBody(e.target.value);
    }
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim().length === 0) {
      setError(!error);
    } else {
      const data = {
        title: title,
        body: body,
      };
      axios
        .post("http://dct-user-auth.herokuapp.com/api/notes", data, {
          headers: {
            "x-auth": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);

          toggleFunction();
        })
        .catch((err) => {
          alert(err.message);
        });
      setTitle("");
      setBody("");
    }
  };
  return (
    <div>
      <form className="noteform" onSubmit={handleSubmit}>
        <h2>Add Notes</h2>
        <input
          type="text"
          onChange={handleChange}
          name="title"
          value={title}
          placeholder="Title"
        />{" "}
        <br />
        {error && <p style={{ color: "red" }}>Title Cannot be Empty</p>}
        <textarea
          onChange={handleChange}
          name="body"
          value={body}
          placeholder="Body"
        ></textarea>
        <br />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}

export default NotesForm;
