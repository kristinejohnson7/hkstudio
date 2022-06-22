import logo from "../assets/hk-logo.png";
import s from "./NavBar.module.css";
import { Link, useNavigate, useOutlet } from "react-router-dom";
import React, { useContext } from "react";
import { userContext } from "../Helper/Context";

function NavBar() {
  let navigate = useNavigate();
  const { totalCartItems } = useContext(userContext);

  return (
    <div className={s.navContainer}>
      <div className={s.navLogo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={s.navBar}>
        <ul className={s.navItems}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>About</li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>Contact</li>
          <li>
            <Link to="/login">Login/Signup</Link>
          </li>
        </ul>
        <button className={s.cartNav} onClick={() => navigate("/cart")}>
          <i className="fa-solid fa-cart-shopping fa-lg"></i>
          <div className={s.cartIconQuantityWrapper}>
            <span>{totalCartItems}</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default NavBar;
