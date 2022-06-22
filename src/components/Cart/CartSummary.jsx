import React, { useContext } from "react";
import Header from "../Header/Header";
import s from "./CartSummary.module.css";
import CheckoutButton from "../Buttons/CheckoutButton";
import { userContext } from "../Helper/Context";

function CartSummary(props) {
  const {
    paymentInfo,
    deliveryCost,
    cartSubtotal,
    itemsInCart,
    cartDiscount,
    cartIds,
    shippingData,
    user,
  } = useContext(userContext);
  const { paymentDetails, paySummary, paymentBtn } = props;
  const deliveryMethodText = deliveryCost === 50 ? "Express" : "Standard";
  const shipping = cartSubtotal < 250 && deliveryCost === 0 ? 25 : deliveryCost;
  const lastFourOfCC =
    paymentInfo.card === undefined ? 0 : paymentInfo.card.slice(-4);

  console.log("paymentInfo", paymentInfo);
  return (
    <div className={s.cartPriceContainer}>
      <Header title="Order Summary" />
      <div className={s.summaryContent}>
        {itemsInCart.map((cartItem) => {
          return (
            <div key={cartItem.id} className={s.itemSummary}>
              <div className={s.itemNameAndQuantity}>
                <div className={s.itemDescription}>
                  <h5>{cartItem.name}</h5>
                  <img src={cartItem.imgMain} alt="cart-item" />
                </div>
                <div className={s.pricingInfo}>
                  <div>
                    $
                    {cartItem.price *
                      cartIds.find((item) => item.id === cartItem.id).quantity}
                  </div>
                  <p>
                    Quantity:{" "}
                    {cartIds.find((item) => item.id === cartItem.id).quantity}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <hr />
      <div className="cartTotals">
        <div className={s.cartSubTotal}>
          <p>Cart Subtotal</p>${cartSubtotal}
        </div>
        <div className={s.cartShipping}>
          <p>Discounts</p>
          <p> ${cartDiscount.toFixed(2)} </p>
        </div>
        <div className={s.cartShipping}>
          <p>Shipping & Handling</p>
          <p> ${shipping} </p>
        </div>
        <div className={s.cartTotal}>
          <h4>Cart Total</h4>
          <p>${cartSubtotal - cartDiscount + shipping}</p>
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
            <p>Total Charge: ${cartSubtotal - cartDiscount + deliveryCost}</p>
            <p>Card Charged: {lastFourOfCC}</p>
          </div>
        </>
      )}
      {paySummary && (
        <div>
          <div>
            <Header title="Shipment Address" />
            <div className={s.shippingAddress}>
              <p>{shippingData.name}</p>
              <p>{user.email}</p>
              <address>
                <p>{shippingData.address}</p>
                <p>{shippingData.zip}</p>
                <p>{shippingData.country}</p>
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
