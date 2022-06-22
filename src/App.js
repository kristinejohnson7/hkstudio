import NavBar from "./components/Nav/NavBar";
import NoMatch from "./components/NoMatch/NoMatch";
import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import ShopDisplay from "./components/ShopDisplay/ShopDisplay";
import Checkout from "./components/Cart/Checkout";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Shipping/Shipping";
import Payment from "./components/Payment/Payment";
import Confirm from "./components/ConfirmPayment/ConfirmPayment";
import Home from "./components/Home/Home";
import UserProvider from "./components/Helper/Context";

function App() {
  return (
    <UserProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopDisplay />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/cart" element={<Checkout />}>
          <Route path="/cart" element={<Cart cart="true" />} />
          <Route path="shipping" element={<Shipping shipping="true" />} />
          <Route path="payment" element={<Payment payment="true" />} />
          <Route path="confirm" element={<Confirm confirm="true" />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
