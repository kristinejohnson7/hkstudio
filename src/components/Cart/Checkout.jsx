import React from "react";
// import s from "./ProgressBar.module.css"
import ProgressBar from "../ProgressBar/ProgressBar"
import { Outlet } from "react-router-dom";

const Checkout = (props) => {

  return (
    <div >
      <ProgressBar />
      <Outlet context="false" />
    </div>
  )
}

export default Checkout;