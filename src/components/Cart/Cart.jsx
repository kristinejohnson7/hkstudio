import React, { useContext, useState } from "react";
import s from "./Cart.module.css";
import Header from "../Header/Header";
import CartFormContainer from "./CartFormContainer";
import Button from "../Buttons/Button";
import InputLabel from "../Form/InputLabel";
import ProgressBar from "../ProgressBar/ProgressBar";
import { userContext } from "../Helper/Context";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [promoError, setPromoError] = useState("");
  const {
    itemsInCart,
    filteredProducts,
    cartSubtotal,
    setCartDiscount,
    cartDiscount,
    setDiscountType,
    taxAmount,
  } = useContext(userContext);

  const navigate = useNavigate();

  const discountCodes = [
    { code: "SUMMER", amount: 0.3 },
    { code: "GET10", amount: 0.1 },
  ];

  const handlePromoCode = (data) => {
    const promo = discountCodes.find((code) => {
      return code.code === data.code;
    });
    setDiscountType(promo);
    if (promo) {
      const discountAmount = promo.amount * cartSubtotal;
      setCartDiscount(discountAmount);
      setPromoError("");
    } else {
      setPromoError(true);
    }
  };

  const onPromoSubmit = (event) => {
    event.preventDefault();
    const fData = new FormData(event.target);
    const userPromoCode = {
      code: fData.get("code"),
    };
    handlePromoCode(userPromoCode);
  };

  return (
    <div className={s.cartBg}>
      <ProgressBar completed="25" text="Cart" />
      <div className={s.cartAndSummaryContainer}>
        <CartFormContainer cart="true" />
        <div className={s.cartPriceContainer}>
          <Header title="Summary" />
          <div className={s.promoContainer}>
            <form onSubmit={onPromoSubmit}>
              <label>Do you have a promo code?</label>
              <div className={s.promoFlex}>
                <InputLabel
                  name="code"
                  type="text"
                  errorM={promoError ? "This promo code does not exist." : null}
                />
                <Button title="APPLY" />
              </div>
            </form>
          </div>
          <hr />
          <div className={s.summaryContent}>
            {filteredProducts.map((cartItem) => {
              return (
                <div key={cartItem.id} className={s.itemSummary}>
                  <div className={s.itemNameAndQuantity}>
                    <h5>{cartItem.name}</h5>
                    <p>
                      Quantity:{" "}
                      {
                        itemsInCart.find((item) => item.id === cartItem.id)
                          .quantity
                      }
                    </p>
                  </div>
                  <div>
                    $
                    {cartItem.price *
                      itemsInCart.find((item) => item.id === cartItem.id)
                        .quantity}
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
            <div className={s.cartTax}>
              <p>Tax</p>${taxAmount.toFixed(2)}
            </div>
            <div className={s.cartDiscount}>
              <p>Discounts</p>
              <p id="discountAmount">
                - ${isNaN(cartDiscount) ? 0 : cartDiscount}
              </p>
            </div>
            <div className={s.cartShipping}>
              <p>Shipping & Handling</p>
              <p> - </p>
            </div>
            <div className={s.cartTotal}>
              <h4>Cart Total</h4>
              <p>
                $
                {cartSubtotal -
                  (isNaN(cartDiscount) ? 0 : cartDiscount) +
                  taxAmount}
              </p>
            </div>
          </div>
          <hr />
          <div className={s.checkoutBtn}>
            {itemsInCart.length ? (
              <button onClick={() => navigate("/cart/shipping")}>
                CHECKOUT
              </button>
            ) : (
              <button disabled>CHECKOUT</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
