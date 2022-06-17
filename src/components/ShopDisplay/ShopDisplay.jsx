import React from "react";
import Button from "../Buttons/Button"
import NavHeader from "../Nav/NavHeader"
import s from "./ShopDisplay.module.css"
import { useState, useEffect } from "react"
import CheckoutButton from "../Buttons/CheckoutButton"


function ShopDisplay(props){
  const {user, onCart, onLogin, cartIds, onRemoveFromCart, products, loading, routeChange} = props
  const [productList, setProducts] = useState([])

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    console.log("searchWord", searchWord)
    console.log("product list", productList)
    const newFilter = products.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setProducts(products);
    } else {
      setProducts(newFilter);
    }
  };

  const sortByCategory = (categoryType) => {
    if (categoryType === "All") {
      setProducts(products)
    } else {
      const filteredCategory = products.filter((product) => product.category.includes(categoryType));
      setProducts(filteredCategory)
    }
  }

  useEffect(() => {
    sortByCategory("All")
  }, [products])

    return (
      <>
         <NavHeader />
         <div className="container">
          <div className={s.shopHeader}>
            <div className={s.productSearch}>
              <div className={s.collectionBtnContainer}>
                <p>Shop by collection:</p>
                <div className={s.btnContainer}>
                  <Button title="All" onClick={() => sortByCategory("All")} />
                  <Button title="Quiet The Noise" onClick={() => sortByCategory("Quiet The Noise Collection")} />
                  <Button title="Christmas"onClick={() => sortByCategory("Christmas Collection")} />
                  <Button title="New Life" onClick={() => sortByCategory("New Life Collection")} />
                </div>
              </div>
              <div className={s.searchInput}>
                <label>Search for an item:</label>
                <input type="text" onChange={handleFilter} />
              </div>
            </div>
            {!user &&
            // ? <CheckoutButton title="CART" onClick={user ? showCart : onLogin} />
             (<div>
            <div className={s.loginBtn}>
              <p>Please login to add items to your cart</p>
              <CheckoutButton title="LOG IN" onClick={() => onLogin(true)} />
            </div>
          </div>)}
          </div>
          <div className={s.shopItems}>
              {!loading ? productList.map((product) => (
                <div key={product.id} className={s.itemContainer}>
                  <img src={product.img} alt="product-img" />
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  {cartIds.find((cart) => cart.id === product.id) 
                  ? <Button onClick={(() => onRemoveFromCart(product.id))} title="REMOVE FROM CART" />
                  : <Button onClick={user ? (() => onCart(product.id)) : () => routeChange("login")} title="ADD TO CART" /> }
                </div>
              )) : <div> Loading... </div>}
          </div>
        </div>
      </>
    )
  }


export default ShopDisplay;