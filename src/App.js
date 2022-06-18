import NavBar from "./components/Nav/NavBar";
import ShopContainer from "./components/ShopContainer/ShopContainer";
import NoMatch from "./components/NoMatch";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import { useState } from "react";
import ShopDisplay from "./components/ShopDisplay/ShopDisplay";
import Checkout from "./components/Checkout/Checkout";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Shipping/Shipping";
import Payment from "./components/Payment/Payment";
import Confirm from "./components/ConfirmPayment/ConfirmPayment";

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
    setCartIds(newIds);
  };

  const removeItemFromCart = (id) => {
    const newIds = cartIds.filter((cart) => cart.id !== id);
    setCartIds(newIds);
  };

  console.log("cartIds", cartIds);

  return (
    <>
      <NavBar routeChange={routeChange} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <ShopContainer
                user={user}
                cartIds={cartIds}
                routeChange={routeChange}
                addItemToCart={addItemToCart}
                removeItemFromCart={removeItemFromCart}
              />
            }
          >
            <Route path="/" element={<ShopDisplay />} />
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
          <Route path="/checkout" element={<Checkout />}>
            <Route path="cart" element={<Cart />} />
            <Route path="shipping" element={<Shipping />} />
            <Route path="payment" element={<Payment />} />
            <Route path="confirm" element={<Confirm />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
