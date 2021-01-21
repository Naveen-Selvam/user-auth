import React, { useState } from "react";
import Modal from "react-modal";


function DisplayItem(props) {
  const [modalisOpen, setModalisOpen] = useState(true);
  const { displayingData } = props;

  return (
    <div>
      <Modal 
        isOpen={modalisOpen}
        onRequestClose={() => setModalisOpen(false)}
        style={{
          overlay: { backgroundColor: "grey" },
          content: { color: "orange" },
        }}
      >
        <h1>{displayingData.title}</h1>
        <h2>{displayingData.body}</h2>
        <button
          style={{ hover: { backgroundColor: "blue" } }}
          onClick={() => setModalisOpen(!modalisOpen)}
        >
          close
        </button> 
      </Modal>
    </div>
  );
}

export default DisplayItem;
