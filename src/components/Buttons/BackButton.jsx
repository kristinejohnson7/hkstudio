import s from "./BackButton.module.css"
import React from "react"

function BackButton(props) {
  const {goBackToPage} = props
  return (
    <div className={s.back} onClick={() => goBackToPage()}>
      <i className="fa-solid fa-angle-left"></i>
      <span>Back</span>
    </div>
  )
}

export default BackButton;