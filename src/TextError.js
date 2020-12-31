import React from "react";

function TextError(props) {
  const { children } = props;

  return <div className="error">{children}</div>;
}

export default TextError;
