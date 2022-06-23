import React, { useContext, useState } from "react";
import s from "./CartItem.module.css";
import { userContext } from "../Helper/Context";

function CartItem(props) {
  const {
    cartIds,
    handleIncrementAction,
    removeItemFromCart,
    products,
  } = useContext(userContext);
  const [quantityError, setQuantityError] = useState("");

  const asc = "asc";
  const desc = "desc";
  const { cartObj } = props;

  const itemQuantity = cartIds.find((id) => cartObj.id === id.id);
  const itemInCart = products.find((product) => cartObj.id == product.id);

  return (
    <div className={s.item}>
      <div className={s.imageBox}>
        <img src={itemInCart.imgMain} style={{ height: "200px" }} alt="item" />
      </div>
      <div className={s.itemDetails}>
        <div className={s.about}>
          <h1 className={s.title}>{itemInCart.name}</h1>
        </div>
        <div className={s.counterContainer}>
          <div className={s.counter}>
            <div
              className={s.btn}
              onClick={() => {
                handleIncrementAction(cartObj.id, asc);
                if (itemQuantity.quantity === itemInCart.quantity) {
                  setQuantityError("Limit exceeded");
                } else {
                  setQuantityError("");
                }
              }}
            >
              +
            </div>
            <div className={s.count}>{itemQuantity.quantity}</div>
            <div
              className={s.btn}
              onClick={() => {
                handleIncrementAction(cartObj.id, desc);
                setQuantityError("");
              }}
            >
              -
            </div>
          </div>
          <p className={s.errorMessage}>{quantityError}</p>
        </div>
        <div className={s.prices}>
          <div className={s.amount}>${itemInCart.price}</div>
          <div
            className={s.remove}
            onClick={() => removeItemFromCart(cartObj.id)}
          >
            <u>Remove</u>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
