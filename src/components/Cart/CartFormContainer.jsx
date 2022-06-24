import CartItem from "./CartItem";
import s from "./CartFormContainer.module.css";
import Header from "../Header/Header";
import Form from "../Form/Form";
import Button from "../Buttons/Button";
import checkConfirm from "../assets/checkConfirm.svg";
import React, { useContext } from "react";
import { userContext } from "../Helper/Context";
import { useNavigate } from "react-router-dom";

function CartFormContainer(props) {
  const { cartIds, setCartIds, itemsInCart } = useContext(userContext);
  const {
    onPaymentFormSubmit,
    error,
    onShippingFormSubmit,
    handleValidations,
    cardData,
    maxLength,
    handleInputData,
    cardType,
    discountAmount,
    cart,
    shipping,
    confirm,
    payment,
  } = props;

  const navigate = useNavigate();

  return (
    <div className={s.cartContainer}>
      {cart && (
        <>
          <div className={s.header}>
            <Header title="Shopping Cart" />
            <h5 className={s.action} onClick={() => setCartIds([])}>
              Remove all
            </h5>
          </div>
          <div className={s.cartItems}>
            {itemsInCart.map((item) => {
              return (
                <CartItem
                  cartObj={cartIds.find((cart) => cart.id === item.id)}
                />
              );
            })}
          </div>
        </>
      )}
      {shipping && (
        <>
          <Header title="Shipping Information" />
          <Form
            shipping="true"
            handleValidations={handleValidations}
            onShippingFormSubmit={onShippingFormSubmit}
            error={error}
          />
        </>
      )}
      {payment && (
        <>
          <Header title="Payment Information" />
          <Form
            payment="true"
            onPaymentFormSubmit={onPaymentFormSubmit}
            cardData={cardData}
            handleInputData={handleInputData}
            handleValidations={handleValidations}
            discountAmount={discountAmount}
            maxLength={maxLength}
            cardType={cardType}
            error={error}
          />
        </>
      )}
      {confirm && (
        <div className={s.confirmContainer}>
          <Header title="Confirmation" />
          <hr className={s.confirmHR} />
          <div className={s.confirmInfoContainer}>
            <img src={checkConfirm} alt="" />
            <h2>
              Congratulations.
              <br />
              Your order is accepted.
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              maiores quia eligendi eaque itaque quas est quam vel excepturi eum
              accusamus, ratione quisquam nam soluta asperiores consectetur
              quasi qui. Minima!
            </p>
          </div>
          <Button title="Track Your Order" />
          <Button
            title="BACK TO THE SHOP"
            onClick={() => {
              navigate("/");
              setCartIds([]);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default CartFormContainer;
