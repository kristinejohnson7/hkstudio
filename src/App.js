import NavBar from "./components/Nav/NavBar";
import ShopContainer from "./components/ShopContainer/ShopContainer";
import NoMatch from "./components/NoMatch/NoMatch";
import React from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import { useState, useContext } from "react";
import ShopDisplay from "./components/ShopDisplay/ShopDisplay";
import Checkout from "./components/Cart/Checkout";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Shipping/Shipping";
import Payment from "./components/Payment/Payment";
import Confirm from "./components/ConfirmPayment/ConfirmPayment";
import Home from "./components/Home/Home";

import { UserContext } from "./components/Helper/Context";

function App() {
  const [user, setUser] = useState("");
  const [cartIds, setCartIds] = useState([]);

  let navigate = useNavigate();
  const routeChange = (path) => {
    let newPath = path;
    navigate(newPath);
  };

  const loginSubmit = (userData) => {
    setUser(userData);
    routeChange("/");
  };

  const addItemToCart = (id) => {
    const newIds = [...cartIds, { id, quantity: 1 }];
    setCartIds((prevState) => [...prevState, { id, quantity: 1 }]);
    countCartItems();
  };

  const removeItemFromCart = (id) => {
    const newIds = cartIds.filter((cart) => cart.id !== id);
    setCartIds(newIds);
    countCartItems();
  };

  const countCartItems = () => {
    const sum = cartIds.reduce((total, current) => {
      return total + current.quantity;
    }, 0);
    return sum;
  };

  const handleIncrementAction = (id, count) => {
    console.log("id", id);
    const oldCartIds = [...cartIds];
    console.log("oldcart ids", oldCartIds);
    const incrementObj = oldCartIds.find((obj) => obj.id === id);
    console.log("increment obj", incrementObj);
    if (count === "asc") {
      incrementObj.quantity += 1;
      setCartIds({ oldCartIds });
      // this.calculateCartDiscount()
    } else if (count === "desc") {
      incrementObj.quantity -= 1;
      setCartIds(oldCartIds.filter((cart) => cart.quantity > 0));
      // this.calculateCartDiscount()
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavBar routeChange={routeChange} />
      <Routes>
        <Route path="/" element={<Home routeChange={routeChange} />} />
        <Route
          path="/shop"
          element={
            <ShopContainer
              // user={user}
              cartIds={cartIds}
              routeChange={routeChange}
              addItemToCart={addItemToCart}
              removeItemFromCart={removeItemFromCart}
              handleIncrementAction={handleIncrementAction}
            />
          }
        >
          <Route path="/shop" element={<ShopDisplay />} />
        </Route>
        <Route
          path="login"
          element={
            <LoginSignUp
              user={user}
              onSubmit={loginSubmit}
              routeChange={routeChange}
            />
          }
        />
        <Route path="/cart" element={<Checkout />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="payment" element={<Payment />} />
          <Route path="confirm" element={<Confirm user={user} />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
