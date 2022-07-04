import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./MyPlays.css";
import Card from "../UIElements/Card";

export default function MyPlays() {
  return (
    <>
      <Navbar />
      <Card className="coming-soon">
        <h1>Plays</h1>
        <h4>Coming Soon</h4>
      </Card>
      <Footer />
    </>
  );
}
