import React, { useEffect, useContext, useState } from "react";
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
import { useParams } from "react-router-dom";

export default function UpdateTrackerPage() {
  const auth = useContext(AuthContext);
  const trackerId = useParams().tid;
  let navigate = useNavigate();
  const [loadedTracker, setLoadedTracker] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
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

  useEffect(() => {
    const fetchTracker = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/trackers/${trackerId}`
        );
        console.log("responseData", responseData);
        setLoadedTracker(responseData.tracker);
        setFormData(
          {
            title: {
              value: responseData.tracker.title,
              isValid: true,
            },
            deposit: {
              value: responseData.tracker.desposit,
              isValid: true,
            },
            withdrawals: {
              value: responseData.tracker.withdrawals,
              isValid: true,
            },
            currentBalance: {
              value: responseData.tracker.currentBalance,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchTracker();
  }, [sendRequest, setFormData, trackerId]);

  async function submitHandler(event) {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/trackers/${trackerId}`,
        "PATCH",
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

  console.log("loadedTracker", loadedTracker);
  return (
    <>
      <Navbar />
      <section className="new-tracker-container">
        <h1 className="page-header">Update Tracker</h1>
        <ErrorModal error={error} onClear={clearError} />
        {!isLoading && loadedTracker && (
          <form className="form" onSubmit={submitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="form-controller">
              <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                errorText="Please enter a valid title"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                initialValue={loadedTracker.title}
                initialValid={true}
              />
            </div>
            <div className="form-controller">
              <Input
                id="deposit"
                element="input"
                type="number"
                label="Deposit"
                errorText="Please enter a valid number"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                initialValue={loadedTracker.deposit}
                initialValid={true}
              />
            </div>
            <div className="form-controller">
              <Input
                id="withdrawals"
                element="input"
                type="number"
                label="Withdrawal"
                errorText="Please enter a valid number"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                initialValue={loadedTracker.withdrawals}
                initialValid={true}
              />
            </div>
            <div className="form-controller">
              <Input
                id="currentBalance"
                element="input"
                type="number"
                label="Current Balance"
                errorText="Please enter a valid number"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                initialValue={loadedTracker.currentBalance}
                initialValid={true}
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
        )}
      </section>
      <Footer />
    </>
  );
}
