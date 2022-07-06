import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./HomePage.css";
import BrmSection from "../components/BrmSection";
import ArticlesSection from "../components/ArticlesSection";
import MyPlaysSection from "../components/MyPlaysSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="page">
        <BrmSection />
        <ArticlesSection />
        <MyPlaysSection />
        <Footer className="homepage-footer" />
      </div>
    </>
  );
}
