import React from "react";
import s from "./CollectionButtons.module.css"

function Button(props) {
  const {onClick, title} = props
  return (
    <button className={s.collectionBtn} onClick={onClick}>{title}</button>
  )
}

export default Button;