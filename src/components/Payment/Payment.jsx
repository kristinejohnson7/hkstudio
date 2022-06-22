import React, { useState, useContext } from "react";
import CartSummary from "../Cart/CartSummary";
import s from "./Payment.module.css";
import CartFormContainer from "../Cart/CartFormContainer";
import ProgressBar from "../ProgressBar/ProgressBar";
import { OTHERCARDS } from "../cardVariables.js";
import { useNavigate } from "react-router-dom";
import { userContext } from "../Helper/Context";
import {
  cardNumberValidation,
  onlyTextValidation,
  cardExpireValidation,
  securityCodeValidation,
} from "../validations";

const INIT_CARD = {
  card: "",
  cardHolder: "",
  expiry: "",
  securityCode: "",
};

function Payment(props) {
  const { user, setPaymentInfo } = useContext(userContext);

  const [cardData, setCardData] = useState(INIT_CARD);
  const [maxLength, setMaxLength] = useState(OTHERCARDS.length);
  const [error, setError] = useState([]);
  const [cardType, setCardType] = useState(null);

  const navigate = useNavigate();

  const findDebitCardType = (cardNumber) => {
    const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };
    for (const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card]))
        return card;
    }
    return "";
  };

  const handleValidations = (type, value) => {
    let errorText;
    switch (type) {
      case "card":
        errorText = cardNumberValidation(value);
        setCardType(findDebitCardType(value));
        setError((prevState) => ({ ...prevState, cardError: errorText }));
        break;
      case "cardHolder":
        errorText = onlyTextValidation(value);
        setError((prevState) => ({ ...prevState, cardHolderError: errorText }));
        break;
      case "expiry":
        errorText = cardExpireValidation(value);
        setError((prevState) => ({ ...prevState, expiryError: errorText }));
        break;
      case "securityCode":
        errorText = securityCodeValidation(3, value);
        setError((prevState) => ({
          ...prevState,
          securityCodeError: errorText,
        }));
        return errorText;
      // case 'expiryMonth':
      //     errorText = cardExpireValidation(this.state.cardData.expiry);
      //     setError((prevState) => ({ ...prevState, expiryError: errorText }));

      //     this.setState(prevState => ({ error: {...prevState.error, expiryError: errorText}}))
      //     break;
      // case 'expiryYear':
      //     errorText = cardExpireValidation(this.state.cardData.expiry);
      //     this.setState(prevState => ({ error: {...prevState.error, expiryError: errorText}}))
      //     break;
      default:
        break;
    }
    return errorText;
  };

  const handleInputData = ({ target: { name, value } }) => {
    if (name === "card") {
      let mask = value.split(" ").join("");
      if (mask.length) {
        mask = mask.match(new RegExp(".{1,4}", "g")).join(" ");
        setCardData((prevState) => ({
          ...prevState.cardData,
          [name]: mask,
        }));
      } else {
        setCardData((prevState) => ({
          ...prevState.cardData,
          [name]: "",
        }));
      }
    } else {
      setCardData((prevState) => ({
        ...prevState.cardData,
        [name]: value,
      }));
    }
  };

  const checkErrorBeforeSave = (data) => {
    let isError = false;
    Object.keys(data).forEach((val) => {
      isError = isError || !!handleValidations(val, data[val]);
    });
    return isError;
  };

  const onPaymentFormSubmit = (event) => {
    event.preventDefault();
    const fData = new FormData(event.target);
    const paymentData = {
      cardHolder: fData.get("cardHolder"),
      card: fData.get("card"),
      expMonth: fData.get("expMonth"),
      expYear: fData.get("expYear"),
      securityCode: fData.get("securityCode"),
    };
    const errorCheck = checkErrorBeforeSave(paymentData);
    if (!errorCheck) {
      setCardData(INIT_CARD);
      setCardType(null);
      setPaymentInfo(paymentData);
      navigate("/cart/confirm");
    }
  };

  return (
    <div className={s.paymentPage}>
      <ProgressBar completed="75" text="Payment" />
      <div className={s.paymentContainer}>
        <CartFormContainer
          error={error}
          cardData={cardData}
          handleInputData={handleInputData}
          handleValidations={handleValidations}
          maxLength={maxLength}
          payment="true"
          onPaymentFormSubmit={onPaymentFormSubmit}
          cardType={cardType}
        />
        <CartSummary userEmail={user.email} paySummary="true" />
      </div>
    </div>
  );
}

export default Payment;
