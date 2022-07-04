import React, { useState, useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./TrackerItem.css";
import { useHttpClient } from "../util/http-hook";
import Input from "../FormElements/Input";
import { VALIDATOR_REQUIRE } from "../util/validator";
import { useForm } from "../util/form-hook";
import { useNavigate } from "react-router";
import TrackerHistory from "./TrackerHistory";
import { AuthContext } from "../util/auth-context";

export default function AddTransactionItem(props) {
  const trackerId = props.id;
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

  async function addWithdrawalToHistory() {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/history`,
        "POST",
        JSON.stringify({
          title: "Withdrawal",
          amount: formState.inputs.withdrawals.value,
          trackerLink: trackerId,
        }),
        { "Content-Type": "application/json" }
      );
    } catch (err) {}
  }

  async function addDepositToHistory() {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/history`,
        "POST",
        JSON.stringify({
          title: "Deposit",
          amount: formState.inputs.deposit.value,
          trackerLink: trackerId,
        }),
        { "Content-Type": "application/json" }
      );
    } catch (err) {}
  }

  async function updateHistory() {
    if (
      formState.inputs.withdrawals.value > 0 &&
      formState.inputs.deposit.value > 0
    ) {
      try {
        await addWithdrawalToHistory();
      } catch (err) {}
      try {
        await addDepositToHistory();
      } catch (err) {}
    } else if (formState.inputs.withdrawals.value > 0) {
      addWithdrawalToHistory();
    } else if (formState.inputs.deposit.value > 0) {
      addDepositToHistory();
    }
  }

  //TODO: Currently works but doesn't refresh. Remove prevent default once you learn how to stay logged in upon refresh
  const updateBalance = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/trackers/${trackerId}`,
        "PATCH",
        JSON.stringify({
          title: props.title,
          deposit: props.deposit + Number(formState.inputs.deposit.value),
          withdrawals:
            props.withdrawals + Number(formState.inputs.withdrawals.value),
          currentBalance: Number(formState.inputs.currentBalance.value),
          net:
            Number(formState.inputs.currentBalance.value) -
            (props.deposit + Number(formState.inputs.deposit.value)) +
            (props.withdrawals + Number(formState.inputs.withdrawals.value)),
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      updateHistory();
      setTimeout(() => {
        handleRedirect();
        window.location.reload();
      }, [600]);
    } catch (err) {}
  };

  function handleRedirect() {
    navigate(`/${auth.userId}/brm-tracker`, { replace: true });
  }

  const netColor = {
    color: props.net > 0 ? "#2ecc71" : "#c0392b",
  };
  return (
    <>
      <div className="brm-container">
        <h1 className="site">{props.title}</h1>
        <h3>Current Balance</h3>
        <h1 className="balance">{props.currentBalance}</h1>

        <div className="inc-exp-container">
          <div>
            <h5>Deposits</h5>
            <p className="money minus">{props.deposit.toFixed(2)}</p>
          </div>
          <div>
            <h5>Withdrawals</h5>
            <p className="money plus">{props.withdrawals.toFixed(2)}</p>
          </div>
          <div>
            <h5>Net</h5>
            <p className="money" style={netColor}>
              {props.net.toFixed(2)}
            </p>
          </div>
        </div>
        <h3>Recent Transactions</h3>
        <ul id="list" className="list">
          <TrackerHistory trackerId={trackerId} />
        </ul>
        <h3>Add transaction</h3>
        <form className="form" onSubmit={updateBalance}>
          <div className="form-control">
            <label htmlFor="deposit">Deposit</label>
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
          <div className="form-control">
            <label htmlFor="withdrawals">Withdrawal</label>
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
          <div className="form-control">
            <label htmlFor="endOfDayBalance">Current Balance</label>
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
          <div style={{ display: "flex" }}>
            <button type="submit" className="button">
              Update balance
            </button>
            <button className="button" onClick={handleRedirect}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
