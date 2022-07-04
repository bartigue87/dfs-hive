import React from "react";
import email from "../images/email.png";
import twitter from "../images/twitter-icons-png-2.png";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <footer role="contentinfo" className="footer">
        <div className="row">
          <ul className="footer__social-links">
            <li className="footer__social-link-item">
              <a href="mailto:bwartigue@gmail.com">
                <img src={email} className="footer__social-image" alt="Email" />
              </a>
            </li>
            <li className="footer__social-link-item">
              <a href="https://twitter.com" title="Link to Twitter">
                <img
                  src={twitter}
                  className="footer__social-image"
                  alt="Twitter"
                />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
