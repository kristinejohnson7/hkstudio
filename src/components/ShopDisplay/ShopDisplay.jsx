import Button from "../Buttons/Button";
import s from "./ShopDisplay.module.css";
import React, { useState, useEffect, useContext } from "react";
import DisplayItem from "./DisplayItem";
import { userContext } from "../Helper/Context";
import { useNavigate } from "react-router-dom";

function ShopDisplay(props) {
  const {
    user,
    itemsInCart,
    setItemsInCart,
    handleIncrementAction,
    addItemToCart,
    loading,
    products,
    quantityError,
    setQuantityError,
    loadError,
  } = useContext(userContext);

  const [productFilter, setProductFilter] = useState([]);
  const [displayItem, setDisplayItem] = useState("");
  const [itemPage, setItemPage] = useState(false);
  const navigate = useNavigate();

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = products.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setProductFilter(products);
    } else {
      setProductFilter(newFilter);
    }
  };

  const sortByCategory = (categoryType) => {
    if (categoryType === "All") {
      setProductFilter(products);
    } else {
      const filteredCategory = products.filter((product) =>
        product.category.includes(categoryType)
      );
      setProductFilter(filteredCategory);
    }
  };

  const handleDisplayItemClick = (e, id) => {
    e.preventDefault();
    setDisplayItem(products.find((product) => product.id === id));
    setItemPage(true);
  };

  const closeItemPage = (e) => {
    e.preventDefault();
    setItemPage(false);
    setQuantityError("");
  };

  useEffect(() => {
    sortByCategory("All");
  }, [products]);

  productFilter.map((product) =>
    localStorage.setItem(product.name, product.imgMain)
  );

  return (
    <div className={s.bgContainer}>
      <div className={`container ${s.shopWrapper}`}>
        <div className={s.shopHeader}>
          <div className={s.productSearch}>
            <div className={s.collectionBtnContainer}>
              <p>Shop by collection:</p>
              <div className={s.btnContainer}>
                <Button title="All" onClick={() => sortByCategory("All")} />
                <Button
                  title="Quiet The Noise"
                  onClick={() => sortByCategory("Quiet The Noise Collection")}
                />
                <Button
                  title="Christmas"
                  onClick={() => sortByCategory("Christmas Collection")}
                />
                <Button
                  title="New Life"
                  onClick={() => sortByCategory("New Life Collection")}
                />
                <Button
                  title="Spring Collection"
                  onClick={() => sortByCategory("Spring Collection")}
                />
              </div>
            </div>
            <div className={s.searchInput}>
              <label>Search for an item:</label>
              <input type="text" onChange={handleFilter} />
            </div>
          </div>
        </div>
        <div className={s.shopItems}>
          {!itemPage &&
            !loading &&
            productFilter.map((product) => (
              <div key={product.id} className={s.itemContainer}>
                <button
                  className={s.displayItemBtn}
                  onClick={(e) => handleDisplayItemClick(e, product.id)}
                >
                  <img
                    className={s.grow}
                    src={localStorage.getItem(product.name)}
                    alt="product-img"
                  />
                </button>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                {itemsInCart.find((cart) => cart.id === product.id) ? (
                  <Button
                    onClick={() =>
                      setItemsInCart(
                        itemsInCart.filter((cart) => cart.id !== product.id)
                      )
                    }
                    title="REMOVE FROM CART"
                  />
                ) : (
                  <Button
                    onClick={
                      user
                        ? () => addItemToCart(product.id)
                        : () => navigate("/login")
                    }
                    title="ADD TO CART"
                  />
                )}
              </div>
            ))}
          {loading && <div> Loading... </div>}
          {itemPage && (
            <>
              <DisplayItem
                handleIncrementAction={handleIncrementAction}
                addItemToCart={addItemToCart}
                close={closeItemPage}
                item={displayItem}
                itemsInCart={itemsInCart}
                user={user}
                quantityError={quantityError}
              />
            </>
          )}
          {loadError && <h3 className="text-danger">Error loading data</h3>}
        </div>
      </div>
    </div>
  );
}

export default ShopDisplay;
