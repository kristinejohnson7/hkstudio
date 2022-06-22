import React, { useContext, useState } from "react";
import BackButton from "../Buttons/BackButton";
import s from "./Shipping.module.css";
import { onlyNumberValidation } from "../validations";
import CartSummary from "../Cart/CartSummary";
import CartFormContainer from "../Cart/CartFormContainer";
import ProgressBar from "../ProgressBar/ProgressBar";
import { userContext } from "../Helper/Context";
import { useNavigate } from "react-router-dom";

function Shipping(props) {
  const [error, setError] = useState([]);
  const { shippingData, setShippingData, setDeliveryMethod } = useContext(
    userContext
  );

  const navigate = useNavigate();

  const handleValidations = (type, value) => {
    let errorText;
    errorText = onlyNumberValidation(value);
    switch (type) {
      case "zip":
        setError((prevState) => ({ ...prevState, zipError: errorText }));
        break;
      case "phone":
        setError((prevState) => ({ ...prevState, phoneError: errorText }));
        break;
      default:
        setError((prevState) => ({ ...prevState, [`${type}Error`]: null }));
        break;
    }
    return errorText;
  };

  const checkErrorBeforeSave = (data) => {
    let errorValue = {};
    let isError = false;
    Object.keys(data).forEach((val) => {
      if (data[val].length === 0 || data[val] === null) {
        errorValue = { ...errorValue, [`${val}Error`]: "Required" };
        isError = true;
      }
    });
    Object.keys(error).forEach((val) => {
      if (error[val]) {
        isError = true;
      }
    });
    setError(errorValue);
    Object.keys(data).forEach((val) => {
      if (data[val].length) {
        handleValidations(val, data[val]);
      }
    });
    return isError;
  };

  const onShippingFormSubmit = (event) => {
    event.preventDefault();
    const fData = new FormData(event.target);
    const shippingData = {
      typeOfAddress: fData.get("typeOfAddress"),
      name: fData.get("name"),
      address: fData.get("address"),
      zip: fData.get("zip"),
      country: fData.get("country"),
      city: fData.get("city"),
      state: fData.get("state"),
      phone: fData.get("phone"),
      deliveryType: fData.get("deliveryType") || "Standard",
    };
    const errorCheck = checkErrorBeforeSave(shippingData);
    if (!errorCheck) {
      setShippingData(shippingData);
      setDeliveryMethod(shippingData.deliveryType);
      navigate("/cart/payment");
    }
  };

  console.log("error", error);

  return (
    <div className={s.cartBg}>
      <ProgressBar completed="50" text="Shipping" />
      <div className={s.cartAndSummaryContainer}>
        <CartFormContainer
          error={error}
          shipping="true"
          onShippingFormSubmit={onShippingFormSubmit}
          handleValidations={handleValidations}
        />
        <CartSummary paymentBtn="true" />
      </div>
    </div>
  );
}

export default Shipping;
