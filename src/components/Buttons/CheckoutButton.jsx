import React from "react";
import s from "./CheckoutButton.module.css"

function CheckoutButton(props) {
  const {onClick, title} = props
  return (
    <button className={s.checkoutBtn} onClick={onClick}>{title}</button>
  )
}

export default CheckoutButton;