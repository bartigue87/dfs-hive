import React from "react";
import prizepicks from "../images/prizepicks-logo.jpeg";
import { useNavigate } from "react-router";

export default function MyPlaysSection() {
  return (
    <>
      <div className="plays-div section">
        <div className="brm-right-section">
          <h3>My Plays</h3>
          <p className="brm-p">
            I will be dropping some of my favorite plays for free across the
            various sites I play. Feel free to tail or fade.
          </p>
        </div>
        <div style={{ margin: "auto" }}>
          <img className="brm-img" src={prizepicks} alt="prizepicks logo" />
        </div>
      </div>
      ;
    </>
  );
}
