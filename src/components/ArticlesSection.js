import React from "react";
import football from "../images/football.jpg";
import hockey from "../images/hockey.jpg";
import basketball from "../images/basketball.jpg";

export default function ArticlesSection() {
  return (
    <>
      <div className="articles-div section">
        <div>
          <h3 className="articles-h3">Articles</h3>
          <p className="brm-p">
            Whether it's basic strategies or my thoughts on certain
            plays/players for the day, these articles will help you be a better
            bettor.
          </p>
        </div>
        <div>
          <div className="image-container">
            <img src={basketball} alt="basketball in net" />
            <img src={football} alt="american football" />
            <img src={hockey} alt="hockey player shooting puck" />
          </div>
        </div>
      </div>
    </>
  );
}
