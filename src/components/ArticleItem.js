import React from "react";
import "./TrackerItem.css";
import { useNavigate } from "react-router";

export default function ArticleItem(props) {
  let navigate = useNavigate();

  function handleRedirect() {
    navigate(`/articles/${props.id}`, { replace: true });
  }
  function handleClick() {
    handleRedirect();
  }
  return (
    <div className="article-item">
      <div className="article-image-container">
        <img className="article-image" src={props.image} alt="" />
      </div>
      <div className="article-text-container">
        <h1 className="site">{props.title}</h1>
        <h6>{props.genre}</h6>
        <p className="article-preview">{props.preview}</p>
        <button className="button article-btn" onClick={handleClick}>
          Check it out
        </button>
      </div>
    </div>
  );
}
