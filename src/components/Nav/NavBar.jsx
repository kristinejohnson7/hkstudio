import logo from "../assets/hk-logo.png"
import s from"./NavBar.module.css"
import { Link } from "react-router-dom"

function NavBar(props) {
 return (
   <div className={s.navContainer}>
     <div className={s.navLogo}>
       <img src={logo} alt="logo" />
     </div>
     <div className={s.navBar}>
      <ul className={s.navItems}>
          <li>About</li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>Contact</li>
          <li>Commissions</li>
          <li>
            <Link to="/login" >Login/Signup</Link>
          </li>
        </ul>
        <button className={s.cartNav} onClick={() => props.routeChange("cart")}>
         <i class="fa-solid fa-cart-shopping fa-lg"></i>
        </button>
     </div>
   </div>
 )
}

export default NavBar