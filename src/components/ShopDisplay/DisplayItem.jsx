import React from "react";
// import s from "./ProgressBar.module.css"

const DisplayItem = (props) => {

  console.log(props.item)

  const {close, item} = props

  return (
    <div >
      <button onClick={close}>
        <i class="fa-solid fa-x"></i>
      </button>
      <div>
        <h2>{item.name}</h2>
        <h5>{item.price}</h5>
        <img src={item.img} alt="product-img" />
        {item.desc}
      </div>
    </div>
  )
}

export default DisplayItem;