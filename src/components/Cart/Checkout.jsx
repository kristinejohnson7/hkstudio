import React from "react";
import { Outlet } from "react-router-dom";

const Checkout = (props) => {
  return (
    <div>
      <Outlet context="false" />
    </div>
  );
};

export default Checkout;
