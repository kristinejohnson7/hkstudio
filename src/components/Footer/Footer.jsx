import logo from "../assets/hk-logo.png";
import s from "./Footer.module.css";
import React from "react";

function NavBar() {
  return (
    <div className={s.footerContainer}>
      <div className={s.footerLogo}>
        <img src={logo} alt="haley klein studio logo" />
      </div>
      <div className={s.footerInfoWrapper}>
        <div className={s.contactInfo}>
          <h5>Contact Me</h5>
          <address>Louisville, KY</address>
          <p>Email: haleykleinart@gmail.com</p>
        </div>
        <div className={s.socialsWrapper}>
          <h5>Follow Me</h5>
          <div className={s.socialItem}>
            <div className={s.socialIcon}>
              <i class="fa-brands fa-instagram"></i>
            </div>
            <a
              href="https://www.instagram.com/haleykleinart/?hl=en"
              target="_blank"
            >
              Instagram
            </a>
          </div>
          <div className={s.socialItem}>
            <div className={s.socialIcon}>
              <i class="fa-brands fa-facebook-f"></i>
            </div>
            <a href="https://www.facebook.com/haleykleinart/" target="_blank">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
