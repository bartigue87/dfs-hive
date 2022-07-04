import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./ArticlesPage.css";
import Card from "../UIElements/Card";

export default function ArticlesPage() {
  return (
    <>
      <Navbar />
      <Card className="coming-soon">
        <h1>Articles</h1>
        <h4>Coming Soon</h4>
      </Card>
      <Footer />
    </>
  );
}
