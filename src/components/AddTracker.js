import React from "react";
import "./AddTracker.css";

export default function AddTracker(props) {
  return (
    <div
      className="brm-container add-tracker"
      style={{ cursor: "pointer" }}
      onClick={props.handleClick}
    >
      <h1>Add +</h1>
    </div>
  );
}
