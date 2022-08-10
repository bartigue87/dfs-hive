import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";
import { useHttpClient } from "../util/http-hook";
import ArticleList from "../components/ArticleList";
import "./ArticlesPage.css";

export default function UserTrackers() {
  let navigate = useNavigate();
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedArticles, setLoadedArticles] = useState();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/articles`
        );
        setLoadedArticles(responseData.articles);
        console.log("loadedArticles:", responseData.articles);
      } catch (err) {}
    };
    fetchArticles();
  }, [sendRequest]);

  return (
    <>
      <Navbar />
      <h1 className="portfolio-header">Articles</h1>
      <section className="article-section">
        {!isLoading && loadedArticles && <ArticleList items={loadedArticles} />}
      </section>
      <Footer />
    </>
  );
}
