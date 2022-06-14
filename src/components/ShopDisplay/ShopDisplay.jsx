import React from "react";
import Button from "../Buttons/Button"
import NavHeader from "../Nav/NavHeader"
import s from "./ShopDisplay.module.css"
import CheckoutButton from "../Buttons/CheckoutButton"

function ShopDisplay(props){
    const {shopItems, user, onCart, onLogin, cartIds, onRemoveFromCart, showCart} = props

    return (
      <>
         <NavHeader />
         <div className="container">
          <div className={s.shopHeader}>
            <h2>The Shop</h2>
            <p>"Art for your walls that add rest to your home"</p>
            {user
            ? <CheckoutButton title="CART" onClick={user ? showCart : onLogin} />
            : (<div>
            <p>Please login to add items to your cart</p>
            <CheckoutButton title="LOG IN" onClick={() => onLogin(true)} />
          </div>)}
          </div>
          <div className={s.shopItems}>
              {shopItems.map((item) => (
                <div key={item.key} className={s.itemContainer}>
                  <img src={item.img} alt="" />
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  {cartIds.find((cart) => cart.id === item.key) 
                  ? <Button onClick={(() => onRemoveFromCart(item.key))} title="REMOVE FROM CART" />
                  : <Button onClick={user ? (() => onCart(item.key)) : onLogin} title="ADD TO CART" /> }
                </div>
              ))}
          </div>
        </div>
      </>
    )
  }


export default ShopDisplay;