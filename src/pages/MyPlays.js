import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./MyPlays.css";
import Card from "../UIElements/Card";

export default function MyPlays() {
  const [date, setDate] = useState();

  useEffect(() => {
    const currentYear = new Date().getFullYear();

    const currentMonth = new Date().getMonth() + 1;

    const currentDay = new Date().getDate();

    let today = [currentMonth, currentDay, currentYear].join("/");

    setDate(today);
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h3>Plays for {date}</h3>
        <div className="grid">
          <img />
          <img />
          <img />
          <img />
        </div>
      </div>
      <Footer />
    </>
  );
}
