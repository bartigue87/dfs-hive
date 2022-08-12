import React, { useEffect, useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./NewTrackerPage.css";
import { useNavigate } from "react-router";
import Button from "../FormElements/Button";
import { useHttpClient } from "../util/http-hook";
import { AuthContext } from "../util/auth-context";
import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import { useParams } from "react-router-dom";

export default function UpdateTrackerPage() {
  const auth = useContext(AuthContext);
  const articleId = useParams().aid;
  let navigate = useNavigate();
  const [loadedArticle, setLoadedArticle] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  function handleRedirect() {
    navigate(`/articles`, { replace: true });
  }
  console.log(articleId);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/articles/${articleId}`
        );
        setLoadedArticle(responseData.articles);
      } catch (err) {}
    };
    fetchArticle();
  }, [sendRequest, articleId]);

  console.log(loadedArticle);

  return (
    <>
      <Navbar />

      <Footer />
    </>
  );
}
