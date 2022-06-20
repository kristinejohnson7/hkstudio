import Button from "../Buttons/Button"
import s from "./ShopDisplay.module.css"
import React, { useState, useEffect, useContext } from "react"
import DisplayItem from "./DisplayItem"
import { UserContext } from "../Helper/Context"


function ShopDisplay(props){

  const {user, setUser} = useContext(UserContext)
  const {products, loading, routeChange, cartIds, onRemoveFromCart, handleIncrementAction} = props
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

  productList.map((product) => localStorage.setItem(product.name, product.imgMain))

    return (
      <div className={s.bgContainer}>
         <div className={`container ${s.shopWrapper}`}>
          <div className={s.shopHeader}>
            <div className={s.productSearch}>
              <div className={s.collectionBtnContainer}>
                <p>Shop by collection:</p>
                <div className={s.btnContainer}>
                  <Button title="All" onClick={() => sortByCategory("All")} />
                  <Button title="Quiet The Noise" onClick={() => sortByCategory("Quiet The Noise Collection")} />
                  <Button title="Christmas"onClick={() => sortByCategory("Christmas Collection")} />
                  <Button title="New Life" onClick={() => sortByCategory("New Life Collection")} />
                  <Button title="Spring Collection" onClick={() => sortByCategory("Spring Collection")} />
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
                && productList.map((product) => (
                <div key={product.id} className={s.itemContainer}>
                  <button className={s.displayItemBtn} onClick={(e) => handleDisplayItemClick(e, product.id)}>
                    <img className={s.grow} src={localStorage.getItem(product.name)} alt="product-img" />
                  </button>
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  {cartIds.find((cart) => cart.id === product.id) 
                  ? <Button onClick={(() => onRemoveFromCart(product.id))} title="REMOVE FROM CART" />
                  : <Button onClick={user ? (() => props.addItemToCart(product.id)) : () => routeChange("login")} title="ADD TO CART" /> }
                </div>
              ))}
              {loading && <div> Loading... </div>}
              {itemPage &&
                <>
                 <DisplayItem handleIncrementAction={handleIncrementAction} addItemToCart={props.addItemToCart} onRemoveFromCart={onRemoveFromCart} close={closeItemPage} item={displayItem} />
                </>
              }
          </div>
        </div>
      </div>
    )
  }


export default ShopDisplay;