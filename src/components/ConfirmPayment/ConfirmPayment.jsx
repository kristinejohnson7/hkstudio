import React from "react";
import s from "./ConfirmPayment.module.css";
import CartSummary from "../Cart/CartSummary";
import CartFormContainer from "../Cart/CartFormContainer";
import ProgressBar from "../ProgressBar/ProgressBar";

function ConfirmPayment(props) {
  const {
    userEmail,
    summaryData,
    getCartSubtotal,
    deliveryCost,
    shippingInfo,
    discountAmount,
    backToShopFromConfirm,
    paymentInfo,
  } = props;

  return (
    <div className={s.paymentPage}>
      <ProgressBar completed="100" text="Confirmation" />
      <div className={s.confirmContainer}>
        <CartFormContainer confirm="true" />
        <CartSummary paySummary="true" paymentDetails="true" />
      </div>
    </div>
  );
}

export default ConfirmPayment;
