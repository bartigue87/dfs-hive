import React from "react";

import Card from "../UIElements/Card";
import AddTransactionItem from "./AddTransactionItem";

const AddTransactionList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No trackers to show yet</h2>
        </Card>
      </div>
    );
  }

  console.log("first Props:", props);

  return (
    <>
      <AddTransactionItem
        key={props.items.id}
        id={props.items.id}
        title={props.items.title}
        deposit={props.items.deposit}
        withdrawals={props.items.withdrawals}
        currentBalance={props.items.currentBalance}
        net={props.items.net}
        history={props.items.history}
        creatorId={props.items.creator}
        onDelete={props.items.onDeleteTracker}
      />
    </>
  );
};

export default AddTransactionList;
