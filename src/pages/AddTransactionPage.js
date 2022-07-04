import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";
import { AuthContext } from "../util/auth-context";
import { useContext } from "react";
import { useHttpClient } from "../util/http-hook";
import AddTransactionList from "../components/AddTransactionList";
import "./UserTrackers.css";

export default function AddTransactionPage() {
  let navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedTracker, setLoadedTracker] = useState();

  const trackerId = useParams().tid;

  useEffect(() => {
    const fetchTracker = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/trackers/${trackerId}`
        );
        setLoadedTracker(responseData.tracker);
      } catch (err) {}
    };
    fetchTracker();
  }, [sendRequest, trackerId]);

  //   const findTracker = (trackerId) => {
  //     setLoadedTracker((prevTrackers) =>
  //       prevTrackers.find((tracker) => tracker.id === trackerId)
  //     );
  //   };

  console.log("loadedTracker:", loadedTracker);

  return (
    <>
      <Navbar />
      {!isLoading && loadedTracker && (
        <>
          <h1 className="portfolio-header">Add Transaction</h1>
          <section className="grid1">
            {loadedTracker && <AddTransactionList items={loadedTracker} />}
          </section>
        </>
      )}
      <Footer />
      {!auth.isLoggedIn && (
        <div className="logged-out-modal">
          <h2 className="logged-out-header">
            Please login to view your bankroll manager
          </h2>
        </div>
      )}
    </>
  );
}
