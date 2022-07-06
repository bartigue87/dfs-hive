import React from "react";
import BRM_IMG from "../images/brm_tracker.png";

export default function BrmSection() {
  return (
    <>
      <div className="brm-div section">
        <div style={{ margin: "auto" }}>
          <img
            className="brm-img"
            src={BRM_IMG}
            alt="bankroll management tool"
          />
        </div>
        <div className="brm-right-section">
          <h3>Bankroll Management Tool</h3>
          <p className="brm-p">
            Keeping track and managing your bankrool is fundamental. This tool
            is a fast and easy way to show your progress. It keeps track of all
            your deposits, withdrawals, balances and net profit across as many
            sites as you use. Just simply enter your current balance at the end
            of the day along with any deposits or withdrawals you make along the
            way.
          </p>
          <button className="brm-btn button">Check it out</button>
        </div>
      </div>
    </>
  );
}
