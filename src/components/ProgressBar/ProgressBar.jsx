import React from "react";
import s from "./ProgressBar.module.css"

const ProgressBar = (props) => {
  const { completed, text } = props;

  const fillers = {
    width: `${completed}%`,
  }
  return (
    <div className={s.containerStyles}>
      <div className={s.fillerStyles} style={fillers}>
        <span className={s.labelStyles}>{`${text}`}</span>
      </div>
    </div>
  )
}

export default ProgressBar;