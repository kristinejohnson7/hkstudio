import CartItem from "./CartItem"
import s from "./CartFormContainer.module.css"
import Header from "../Header/Header"
import Form from "../Form/Form"
import Button from "../Buttons/Button"
import checkConfirm from "../assets/checkConfirm.svg"

function CartFormContainer(props) {
  const {confirm, deliveryCost, onPaymentFormSubmit, payment, shipping, getCartSubtotal, cart, cartIds, incrementAction, filteredItems, removeAllItemsFromCart, removeItemFromCart,
  handleDeliveryMethod, error, handleBlur, onShippingFormSubmit, handleValidations, cardData, maxLength,
handleInputData, cardType, discountAmount, backToShopFromConfirm} = props

  return (
  <div className={s.cartContainer}>
    {cart && 
      <>
        <div className={s.header}>
          <Header title="Shopping Cart" />
          <h5 className={s.action} onClick={removeAllItemsFromCart}>Remove all</h5>
        </div>
        <div className={s.cartItems}>
          {filteredItems.map((obj) => {
            return (
              <CartItem 
              key={obj.key}
              removeItemFromCart={removeItemFromCart}
              obj={obj}
              cartId={cartIds.find((cart) => cart.id === obj.key)}
              handleIncrementItem={incrementAction}
              />
            )
          })}
        </div>
      </>}
    {shipping && 
      <>
        <Header title="Shipping Information"/>
        <Form 
        shipping="true"
        handleDeliveryMethod={handleDeliveryMethod}
        handleValidations={handleValidations}
        onShippingFormSubmit={onShippingFormSubmit}
        getCartSubtotal={getCartSubtotal}
        handleBlur={handleBlur}
        error={error}
        />
      </>
    }
    {payment &&
      <>
      <Header title="Payment Information" />
      <Form 
      payment="true"
      onPaymentFormSubmit={onPaymentFormSubmit}
      getCartSubtotal={getCartSubtotal}
      deliveryCost={deliveryCost}
      cardData={cardData}
      handleInputData={handleInputData}
      handleValidations={handleValidations}
      discountAmount={discountAmount}
      maxLength={maxLength}
      cardType={cardType}
      error={error}
      />
      </>
    }
    {confirm && 
      <div className={s.confirmContainer}>
        <Header title="Confirmation" />
        <hr className={s.confirmHR} />
        <div className={s.confirmInfoContainer}>
          <img src={checkConfirm} alt="" />
          <h2>Congratulations.<br/>
          Your order is accepted.
          </h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni maiores quia eligendi eaque itaque quas est quam vel excepturi eum accusamus, ratione quisquam nam soluta asperiores consectetur quasi qui. Minima!</p>
        </div>
        <Button title="Track Your Order"/>
        <Button title="BACK TO THE SHOP" onClick={() => backToShopFromConfirm(true)} />
      </div>
    }
  </div>
  )
}

export default CartFormContainer