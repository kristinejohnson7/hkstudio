import React from "react";
import s from "./Button.module.css"

function Button(props) {
  const {onClick, title} = props
  return (
    <button className={s.standardBtn} onClick={onClick}>{title}</button>
  )
}

export default Button;