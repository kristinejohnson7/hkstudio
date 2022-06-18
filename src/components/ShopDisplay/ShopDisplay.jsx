import React from "react";
import Button from "../Buttons/Button"
import NavHeader from "../Nav/NavHeader"
import s from "./ShopDisplay.module.css"
import { useState, useEffect } from "react"
import CheckoutButton from "../Buttons/CheckoutButton"
import DisplayItem from "./DisplayItem"


function ShopDisplay(props){
  const {products, loading, routeChange, user, cartIds, onLogin, onRemoveFromCart, onCart} = props
  const [productList, setProducts] = useState([])
  const [displayItem, setDisplayItem] = useState("")
  const [itemPage, setItemPage] = useState(false)

  const handleFilter = (event) => {
    const searchWord = event.target.value;
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

  const handleDisplayItemClick = (e, id) => {
    e.preventDefault()
    console.log("handle display function")
    setDisplayItem(products.find(product => product.id === id))
    setItemPage(true)
  }

  const closeItemPage= (e) => {
    e.preventDefault()
    setItemPage(false)
  }

  useEffect(() => {
    sortByCategory("All")
  }, [products])

  console.log("cartIds in ShopDisplay", cartIds)
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
          </div>
          <div className={s.shopItems}>
            {!itemPage && !loading 
                ? productList.map((product) => (
                <div key={product.id} className={s.itemContainer}>
                  <button className={s.displayItemBtn} onClick={(e) => handleDisplayItemClick(e, product.id)}>
                    <img className={s.grow} src={product.img} alt="product-img" />
                  </button>
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  {cartIds.find((cart) => cart.id === product.id) 
                  ? <Button onClick={(() => onRemoveFromCart(product.id))} title="REMOVE FROM CART" />
                  : <Button onClick={user ? (() => props.handleCartIds(product.id)) : () => routeChange("login")} title="ADD TO CART" /> }
                </div>
              )) : <div> Loading... </div>}
              {itemPage &&
                <>
                 <DisplayItem close={closeItemPage} item={displayItem} />
                </>
              }
          </div>
        </div>
      </>
    )
  }


export default ShopDisplay;