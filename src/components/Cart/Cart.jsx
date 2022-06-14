import React from "react";
import s from "./Cart.module.css"
import BackButton from "../Buttons/BackButton";
import Header from "../Header/Header";
import CartFormContainer from "./CartFormContainer";
import Button from "../Buttons/Button";
import InputLabel from "../Form/InputLabel";
import ProgressBar from "../ProgressBar/ProgressBar";

function Cart(props) {
    const {onReturn, showShipping, summaryData, cartIds, filteredItems,
      removeAllItemsFromCart, removeItemFromCart, incrementAction,
    discount, promoError, getCartSubtotal} = props

    const onPromoSubmit = (event) => {
      event.preventDefault()
      const fData = new FormData(event.target)
      const userPromoCode =  {
        code: fData.get("code")
      }
      props.handlePromoCode(userPromoCode)
    }

    return (
      <div className={s.cartBg}>
        <BackButton goBackToPage={onReturn} />
        <ProgressBar completed="25" text="Cart"/>
        <div className={s.cartAndSummaryContainer}>
          <CartFormContainer 
            filteredItems={filteredItems}
            removeAllItemsFromCart={removeAllItemsFromCart}
            removeItemFromCart={removeItemFromCart}
            incrementAction={incrementAction}
            cartIds={cartIds}
            cart="true"
          />
        <div className={s.cartPriceContainer}>
          <Header title="Summary" />
          <div className={s.promoContainer}>
            <form onSubmit={onPromoSubmit}>
              <label>Do you have a promo code?</label>
              <div className={s.promoFlex}>
                <InputLabel
                name="code" 
                type="text" 
                errorM={
                  (promoError
                  ? "This promo code does not exist."
                  : null
                  )}
                />
                <Button title="APPLY" />
              </div>
            </form>
          </div>
          <hr />
          <div className={s.summaryContent}>
            {summaryData.map((cartItem) => {
              return (
              <div key={cartItem.id} className={s.itemSummary}>
                <div className={s.itemNameAndQuantity}>
                  <h5>{cartItem.name}</h5>
                  <p>Quantity: {cartItem.quantity}</p>
                </div>
                <div>
                  ${cartItem.price * cartItem.quantity}
                </div>
              </div>)
            })}
          </div>
          <hr />
          <div className="cartTotals">
            <div className={s.cartSubTotal}>
              <p>Cart Subtotal</p>
              ${getCartSubtotal()}
            </div>
            <div className={s.cartDiscount}>
              <p>Discounts</p>
              <p id="discountAmount">- ${isNaN(discount) ? 0 : discount}</p>
            </div>
            <div className={s.cartShipping}>
              <p>Shipping & Handling</p>
              <p> - </p>
            </div>
            <div className={s.cartTotal}>
              <h4>Cart Total</h4>
              <p>${getCartSubtotal() - (isNaN(discount) ? 0 : discount)}</p>
            </div>
          </div>
          <hr />
          <div className={s.checkoutBtn}>
            {cartIds.length ? 
            <button onClick={() => showShipping()}>CHECKOUT</button> :
            <button disabled>CHECKOUT</button>
            }
          </div>
        </div>
      </div>
    </div>
      
    )
  
}

export default Cart;