import React from "react";
import { useHttpClient } from "../util/http-hook";

export default function HitoryItem(props) {
  const { sendRequest } = useHttpClient();

  async function submitDelete() {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/history/${props.id}`,
        "DELETE"
      );
      props.onDelete(props.id);
    } catch (err) {}
  }

  return (
    <>
      {
        <li key={props.id}>
          <p>{props.title}:</p>
          <p>${props.amount}</p>
          <p>{props.date}</p>
          <button className="delete-btn" onClick={submitDelete}>
            X
          </button>
        </li>
      }
    </>
  );
}
