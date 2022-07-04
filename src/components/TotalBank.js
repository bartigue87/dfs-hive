import React, { useState, useEffect } from "react";
import "./TotalBank.css";

export default function TotalBank(props) {
  const [deposit, setDeposit] = useState(0);
  const [withdrawal, setWithdrawal] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [net, setNet] = useState(0);

  useEffect(() => {
    function setTotals() {
      try {
        for (let i = 0; i < props.items.length; i++) {
          setDeposit(
            (prevState) => (prevState += Number(props.items[i].deposit))
          );
          setWithdrawal(
            (prevState) => (prevState += Number(props.items[i].withdrawals))
          );
          setTotalBalance(
            (prevState) => (prevState += Number(props.items[i].currentBalance))
          );
          setNet((prevState) => (prevState += Number(props.items[i].net)));
        }
      } catch (err) {}
    }
    setTotals();
  }, [props.items]);

  const netColor = {
    color: net > 0 ? "#2ecc71" : "#c0392b",
  };

  return (
    <div className="inc-exp-container total-bank">
      <div>
        <h5>Deposits</h5>
        <p className="money minus">{deposit.toFixed(2)}</p>
      </div>
      <div>
        <h5>Withdrawals</h5>
        <p className="money plus">{withdrawal.toFixed(2)}</p>
      </div>
      <div>
        <h5>Net</h5>
        <p className="money" style={netColor}>
          {net.toFixed(2)}
        </p>
      </div>
      <div>
        <h5>Balance</h5>
        <p className="money">{totalBalance}</p>
      </div>
    </div>
  );
}
