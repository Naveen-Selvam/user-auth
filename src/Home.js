import React from "react";
import img1 from "./images/download1.jpg";

const Home = (props) => {
  return (
    <div>
      {props.location.state && (
        <p style={{ color: "green", textAlign: "center" }}>
          {props.location.state}
        </p> 
      )}
      <h1 style={{ textAlign: "center", textDecorationColor: "honeydew" }}>
        User Authentication vs User Authorization
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img className="image" src={img1} alt="home page" />
      </div>
      <div className="row">
        <div className="column">
          <h3>Authentication</h3>

          <li>Determines whether users are who they claim to be</li>
          <li>Usually done before authorization</li>
          <li>Generally, transmits info through an ID Token</li>
          <li>Challenges the user to validate credentials</li>
          <li>Generally governed by the OpenID Connect (OIDC) protocol</li>
        </div>
        <div className="column">
          <h3>Authorization</h3>

          <li>Determines what users can and cannot access</li>
          <li>Usually done after successful authentication</li>
          <li>Generally, transmits info through an Access Token</li>
          <li>Generally governed by the OAuth 2.0 framework</li>
          <li>Verifies whether access is allowed through policies and rules</li>
        </div>
      </div>
    </div>
  );
};

export default Home;
