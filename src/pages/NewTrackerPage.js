import React, { useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./NewTrackerPage.css";
import { useNavigate } from "react-router";
import Input from "../FormElements/Input";
import { VALIDATOR_REQUIRE } from "../util/validator";
import Button from "../FormElements/Button";
import { useForm } from "../util/form-hook";
import { useHttpClient } from "../util/http-hook";
import { AuthContext } from "../util/auth-context";
import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";

export default function NewTrackerPage() {
  const auth = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      deposit: {
        value: "",
        isValid: false,
      },
      withdrawals: {
        value: "",
        isValid: false,
      },
      currentBalance: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  function handleRedirect() {
    navigate(`/${auth.userId}/brm-tracker`, { replace: true });
  }

  async function submitHandler(event) {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/trackers`,
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          deposit: formState.inputs.deposit.value,
          withdrawals: formState.inputs.withdrawals.value,
          currentBalance: formState.inputs.currentBalance.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      handleRedirect();
    } catch (err) {}
  }

  return (
    <>
      <Navbar />
      <section className="new-tracker-container">
        <h1 className="page-header">Create a new Tracker</h1>
        <ErrorModal error={error} onClear={clearError} />
        <form className="form" onSubmit={submitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="form-controller">
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              placeholder="Which site/app?"
              errorText="Please enter a valid title"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </div>
          <div className="form-controller">
            <Input
              id="deposit"
              element="input"
              type="number"
              label="Deposit"
              placeholder="Enter amount... enter 0 if you didn't deposit"
              errorText="Please enter a valid number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </div>
          <div className="form-controller">
            <Input
              id="withdrawals"
              element="input"
              type="number"
              label="Withdrawal"
              placeholder="Enter amount... enter 0 if you didn't withdraw"
              errorText="Please enter a valid number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </div>
          <div className="form-controller">
            <Input
              id="currentBalance"
              element="input"
              type="number"
              label="Current Balance"
              placeholder="Enter the amount of money in your account"
              errorText="Please enter a valid number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </div>
          <div style={{ display: "flex", gap: "25px" }}>
            <Button type="submit" disabled={!formState.isValid}>
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
