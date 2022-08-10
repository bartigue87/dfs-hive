import React from "react";
import "./TrackerItem.css";

export default function ArticleItem(props) {
  return (
    <div className="article-item">
      <img className="article-image" src={props.image} alt="" />
      <div className="article-text-container">
        <h1 className="site">{props.title}</h1>
        <h6>{props.genre}</h6>
        <p className="article-preview">{props.preview}</p>
        <button className="button article-btn">Check it out</button>
      </div>
    </div>
  );
}
