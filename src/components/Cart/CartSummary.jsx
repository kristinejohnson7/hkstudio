import React, { useContext } from "react";
import Header from "../Header/Header";
import s from "./CartSummary.module.css";
import CheckoutButton from "../Buttons/CheckoutButton";
import { userContext } from "../Helper/Context";

function CartSummary(props) {
  const { countCartItems } = useContext(userContext);
  const {
    paymentDetails,
    userEmail,
    shippingInfo,
    paySummary,
    paymentBtn,
    summaryData,
    getCartSubtotal,
    deliveryCost,
    discountAmount,
    paymentInfo,
  } = props;
  const subtotal = getCartSubtotal();
  const deliveryMethodText = deliveryCost === 50 ? "Express" : "Standard";
  const shipping = subtotal < 250 && deliveryCost === 0 ? 25 : deliveryCost;

  return (
    <div className={s.cartPriceContainer}>
      <Header title="Order Summary" />
      <div className={s.summaryContent}>
        {summaryData.map((cartItem) => {
          return (
            <div key={cartItem.id} className={s.itemSummary}>
              <div className={s.itemNameAndQuantity}>
                <div className={s.itemDescription}>
                  <h5>{cartItem.name}</h5>
                  <img src={cartItem.img} alt="cart-item" />
                </div>
                <div className={s.pricingInfo}>
                  <div>${cartItem.price * cartItem.quantity}</div>
                  <p>Quantity: {cartItem.quantity}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <hr />
      <div className="cartTotals">
        <div className={s.cartSubTotal}>
          <p>Cart Subtotal</p>${subtotal}
        </div>
        <div className={s.cartShipping}>
          <p>Discounts</p>
          <p> ${discountAmount.toFixed(2)} </p>
        </div>
        <div className={s.cartShipping}>
          <p>Shipping & Handling</p>
          <p> ${shipping} </p>
        </div>
        <div className={s.cartTotal}>
          <h4>Cart Total</h4>
          <p>${(subtotal - discountAmount + shipping).toFixed(2)}</p>
        </div>
      </div>
      <hr />
      {paymentBtn && (
        <div className={s.checkoutBtn}>
          <CheckoutButton
            title="PAYMENT"
            onClick={(event) => {
              document.getElementById("submitButton").click();
            }}
          />
        </div>
      )}
      {paymentDetails && (
        <>
          <Header title="Payment" />
          <div className={s.paymentCardDetails}>
            <p>
              Total Charge: ${(subtotal - discountAmount + shipping).toFixed(2)}
            </p>
            <p>Card Charged: {paymentInfo.card.slice(-4)}</p>
          </div>
        </>
      )}
      {paySummary && (
        <div>
          <div>
            <Header title="Shipment Address" />
            <div className={s.shippingAddress}>
              <p>{shippingInfo.name}</p>
              <p>{userEmail}</p>
              <address>
                <p>{shippingInfo.address}</p>
                <p>{shippingInfo.zip}</p>
                <p>{shippingInfo.country}</p>
              </address>
            </div>
          </div>
          <div className={s.shippingMethod}>
            <Header title="Shipment Method" />
            <div className={s.deliveryText}>
              <h4>{deliveryMethodText}</h4>
              <p>
                {deliveryMethodText === "Standard"
                  ? "Delivery in 4-6 Business Days"
                  : "Delivery in 1-3 Business Days"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartSummary;
