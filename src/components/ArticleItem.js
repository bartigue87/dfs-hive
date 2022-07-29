import React from "react";
import "./TrackerItem.css";

export default function ArticleItem(props) {
  return (
    <>
      <h1 className="site">{props.title}</h1>
      <p>{props.articleBody}</p>
      <img src={props.image} alt="" />
    </>
  );
}
