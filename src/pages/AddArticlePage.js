import React, { useEffect, useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import ErrorModal from "../UIElements/ErrorModal";
import Input from "../FormElements/Input";
import { VALIDATOR_REQUIRE } from "../util/validator";
import Button from "../FormElements/Button";
import { useNavigate } from "react-router";
import { AuthContext } from "../util/auth-context";
import { useForm } from "../util/form-hook";
import { useHttpClient } from "../util/http-hook";

export default function AddArticlePage() {
  const auth = useContext(AuthContext);
  let navigate = useNavigate();

  const admin = process.env.REACT_APP_ADMIN;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { isLoading, error, setError, sendRequest, clearError } =
    useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      articleBody: {
        value: "",
        isValid: false,
      },
      preview: {
        value: "",
        isValid: false,
      },
      genre: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  function handleRedirect() {
    navigate(`/`, { replace: true });
  }

  async function submitHandler(event) {
    console.log(auth.userId);
    console.log("admin:", admin);
    event.preventDefault();
    if (auth.userId === admin) {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/articles`,
          "POST",
          JSON.stringify({
            title: formState.inputs.title.value,
            articleBody: formState.inputs.articleBody.value,
            preview: formState.inputs.preview.value,
            genre: formState.inputs.genre.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        handleRedirect();
      } catch (err) {
        console.log("WRONG");
      }
    } else {
      setError("You are not authorized!");
    }
  }

  return (
    <>
      <Navbar />
      <section className="new-tracker-container">
        <h1 className="page-header">Add New Article</h1>
        <ErrorModal error={error} onClear={clearError} />
        <form className="form" onSubmit={submitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="form-controller">
            <Input
              id="title"
              element="input"
              type="text"
              label="Title of article"
              placeholder="Title"
              errorText="Please enter a valid title"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </div>
          <div className="form-controller">
            <Input
              id="genre"
              element="input"
              type="text"
              label="Genre"
              placeholder="Genre"
              errorText="Please enter a valid genre"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </div>
          <div className="form-controller">
            <Input
              id="articleBody"
              element="textarea"
              type="textarea"
              label="Body"
              placeholder="Body"
              errorText="Please enter a valid body"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </div>
          <div className="form-controller">
            <Input
              id="preview"
              element="textarea"
              type="textarea"
              label="Preview"
              placeholder="Preview"
              errorText="Please enter a valid preview"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </div>
          <div style={{ display: "flex", gap: "25px" }}>
            <Button
              type="submit"
              disabled={!formState.isValid}
              onClick={submitHandler}
            >
              Submit
            </Button>
            <button onClick={handleRedirect} className="button">
              Cancel
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
}
