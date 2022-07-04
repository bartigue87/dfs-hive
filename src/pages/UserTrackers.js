import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TotalBank from "../components/TotalBank";
import { TotalProvider } from "../components/TotalContext";
import Navbar from "../components/Navbar";
import AddTracker from "../components/AddTracker";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";
import { AuthContext } from "../util/auth-context";
import { useContext } from "react";
import { useHttpClient } from "../util/http-hook";
import TrackerList from "./TrackerList";
import "./UserTrackers.css";

export default function UserTrackers() {
  let navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedTrackers, setLoadedTrackers] = useState();
  const [gridLength, setGridLength] = useState(0);
  const [gridClassName, setGridClassName] = useState("");

  const userId = useParams().userId;

  useEffect(() => {
    const fetchTrackers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/trackers/user/${userId}`
        );
        setLoadedTrackers(responseData.trackers);
        setGridLength(responseData.trackers.length);
      } catch (err) {}
    };
    fetchTrackers();
  }, [sendRequest, userId]);

  console.log(gridLength);

  console.log(loadedTrackers);

  useEffect(() => {
    if (gridLength === 1) {
      setGridClassName("grid1");
    } else if (gridLength === 2) {
      setGridClassName("grid2");
    } else if (gridLength > 2) {
      setGridClassName("grid3");
    }
  }, [gridLength]);

  function handleAddBtn() {
    navigate("/new-tracker", { replace: true });
  }
  function handleLoginBtn() {
    navigate("/login", { replace: true });
  }

  const trackerDeleteHandler = (deletedTrackerId) => {
    setLoadedTrackers((prevTrackers) =>
      prevTrackers.filter((tracker) => tracker.id !== deletedTrackerId)
    );
  };

  return (
    <>
      <Navbar />
      {auth.isLoggedIn && (
        <>
          <h1 className="portfolio-header">Bankroll Manager</h1>
          <TotalProvider>
            <TotalBank items={loadedTrackers} />
          </TotalProvider>
          <AddTracker handleClick={handleAddBtn} />
          <section className={gridClassName}>
            {!isLoading && loadedTrackers && (
              <TrackerList
                items={loadedTrackers}
                onDeleteTracker={trackerDeleteHandler}
              />
            )}
          </section>
          <Footer />
        </>
      )}
      {!auth.isLoggedIn && (
        <div className="logged-out-modal">
          <h2 className="logged-out-header">
            Please login to view your bankroll manager
          </h2>
          <button className="button" onClick={handleLoginBtn}>
            Login
          </button>
        </div>
      )}
    </>
  );
}
