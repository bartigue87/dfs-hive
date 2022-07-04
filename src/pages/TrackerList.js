import React from "react";

import Card from "../UIElements/Card";
import TrackerItem from "../components/TrackerItem";

const TrackerList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No trackers to show yet</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      {props.items.map((tracker) => (
        <TrackerItem
          key={tracker.id}
          id={tracker.id}
          title={tracker.title}
          deposit={tracker.deposit}
          withdrawals={tracker.withdrawals}
          currentBalance={tracker.currentBalance}
          net={tracker.net}
          history={tracker.history}
          creatorId={tracker.creator}
          onDelete={props.onDeleteTracker}
        />
      ))}
    </>
  );
};

export default TrackerList;
