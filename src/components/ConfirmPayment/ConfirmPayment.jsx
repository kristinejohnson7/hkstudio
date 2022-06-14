import React from "react";
import s from "./ConfirmPayment.module.css"
import CartSummary from "../Cart/CartSummary";
import CartFormContainer from "../Cart/CartFormContainer";
import ProgressBar from "../ProgressBar/ProgressBar";


function ConfirmPayment(props) {
  const {userEmail, summaryData, getCartSubtotal, deliveryCost, 
    shippingInfo, discountAmount, backToShopFromConfirm, paymentInfo} = props

  return (
    <div className={s.paymentPage}>
      <ProgressBar completed="100" text="Confirmation"/>
      <div className={s.confirmContainer}>
        <CartFormContainer
          confirm="true"
          summaryData={summaryData}
          getCartSubtotal={getCartSubtotal}
          deliveryCost={deliveryCost}
          shippingInfo={shippingInfo}
          backToShopFromConfirm={backToShopFromConfirm}
        />
        <CartSummary 
          summaryData={summaryData}
          paymentInfo={paymentInfo}
          discountAmount={discountAmount}
          getCartSubtotal={getCartSubtotal}
          deliveryCost={deliveryCost}
          paySummary="true"
          shippingInfo={shippingInfo}
          userEmail={userEmail}
          paymentDetails="true"
        />
    </div>
  </div>
  )
}

export default ConfirmPayment;