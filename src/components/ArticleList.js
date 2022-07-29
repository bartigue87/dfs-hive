import React from "react";

import Card from "../UIElements/Card";
import ArticleItem from "../components/ArticleItem";

const ArticleList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No articles to show yet</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      {props.items.map((article) => (
        <ArticleItem
          key={article.id}
          id={article.id}
          title={article.title}
          articleBody={article.articleBody}
          image={article.image}
        />
      ))}
    </>
  );
};

export default ArticleList;
