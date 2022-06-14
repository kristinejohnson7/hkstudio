import logo from "../assets/hk-logo.png"
import s from"./NavBar.module.css"

function NavBar() {
 return (
   <div className={s.navContainer}>
     <div className={s.navLogo}>
       <img src={logo} alt="logo" />
     </div>
     <div className={s.navBar}>
      <ul className={s.navItems}>
          <li>About</li>
          <li>Shop</li>
          <li>Contact</li>
          <li>Commissions</li>
        </ul>
     </div>
   </div>
 )
}

export default NavBar