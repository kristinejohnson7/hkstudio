import s from "./Header.module.css"
import React from "react";

function Header(props) {
  const {title} = props
  return (
    <div className={s.header}>
      <h3 className={s.heading}>{title}</h3>
    </div>
  )
}

export default Header;