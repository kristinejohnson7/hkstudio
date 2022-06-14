import React from "react"
import s from "./NavHeader.module.css"
import photo1 from "../assets/nav-header/photo3.jpeg"
import photo2 from "../assets/nav-header/photo2.jpeg"
import photo3 from "../assets/nav-header/photo5.jpeg"
import photo4 from "../assets/nav-header/photo1.jpeg"

function NavHeader() {
  return (
    <div className={`container ${s.carouselContainer}`}>
      <div className={s.photo}>
        <img src={photo1} alt="" />
      </div> 
      <div className={s.photo}>
        <img src={photo3} alt="" />
      </div>
      <div className={s.photo}>
        <img src={photo2} alt="" />
      </div>
      <div className={s.photo}>
        <img src={photo4} alt="" />
      </div>
    
    </div>
  )
}

export default NavHeader