import React from "react"
import s from "./CartItem.module.css"

function CartItem(props) {
  const asc = "asc"
  const desc = "desc"
  const {obj, cartId, removeItemFromCart, handleIncrementItem} = props
  
  return (
  <div className={s.item}>
    <div className={s.imageBox}>
      <img src={obj.img} style={{ height: "200px" }} alt="item" />
    </div>
    <div className={s.itemDetails}>
      <div className={s.about}>
        <h1 className={s.title}>{obj.name}</h1>
      </div>
      <div className={s.counter}>
        <div className={s.btn} onClick={() => handleIncrementItem(obj.key, asc)}>+</div>
        <div className={s.count}>{cartId.quantity}</div>
        <div className={s.btn} onClick={() => handleIncrementItem(obj.key, desc)}>-</div>
      </div>
      <div className={s.prices}>
        <div className={s.amount}>${obj.price}</div>
        <div className={s.remove} onClick={() => removeItemFromCart(obj.key)}><u>Remove</u></div>
      </div>
    </div>
  </div>
)
}

export default CartItem