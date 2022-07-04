import React, { useEffect, useState } from "react";
import { useHttpClient } from "../util/http-hook";
import HistoryList from "./HistoryList";

const TrackerHistory = (props) => {
  const trackerId = props.trackerId;
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedHistory, setLoadedHistory] = useState();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/history/tracker/${trackerId}`
        );
        setLoadedHistory(responseData.history);
      } catch (err) {}
    };
    fetchHistory();
  }, [sendRequest, trackerId]);

  const historyDeleteHandler = (deletedHistoryId) => {
    setLoadedHistory((prevTrackers) =>
      prevTrackers.filter((history) => history.id !== deletedHistoryId)
    );
  };

  return (
    <>
      {!isLoading && loadedHistory && (
        <HistoryList
          items={loadedHistory}
          onDeleteHistory={historyDeleteHandler}
        />
      )}
    </>
  );
};

export default TrackerHistory;
