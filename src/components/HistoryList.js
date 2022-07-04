import React from "react";
import HistoryItem from "./HistoryItem";

export default function HistoryList(props) {
  return (
    <>
      {props.items.map((history) => (
        <HistoryItem
          key={history.id}
          id={history.id}
          title={history.title}
          amount={history.amount}
          date={history.date}
          trackerId={history.trackerLink}
          onDelete={props.onDeleteHistory}
        />
      ))}
    </>
  );
}
