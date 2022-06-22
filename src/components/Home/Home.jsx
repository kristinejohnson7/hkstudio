import React from "react";
import s from "../Home/Home.module.css"
import { useNavigate } from "react-router-dom"


const Home = () => {

  let navigate = useNavigate()

  return (
    <div className={s.bigImage}>
      <div className={s.overlay}>
        <div className={s.heroText}>
          <h5>Art for your walls that add</h5>
          <h1>rest to your home</h1>
          <button onClick={() => navigate("shop")}>SHOP NOW</button>
        </div>
      </div>
    </div>
  )
}

export default Home;