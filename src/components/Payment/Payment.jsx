import React from "react";
import BackButton from "../Buttons/BackButton";
import CartSummary from "../Cart/CartSummary";
import s from "./Payment.module.css"
import CartFormContainer from "../Cart/CartFormContainer";
import ProgressBar from "../ProgressBar/ProgressBar";
import { OTHERCARDS } from "../cardVariables.js";
import { cardNumberValidation, onlyTextValidation, cardExpireValidation, securityCodeValidation } from "../validations"

const INIT_CARD = {
  card: "",
  cardHolder: "",
  expiry: "",
  securityCode: ""
}

class Payment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardData: INIT_CARD,
      maxLength: OTHERCARDS.length,
      error: {},
      cardType: null,
    }
  }

  findDebitCardType = (cardNumber) => {
    const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };
    for (const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) return card;
    }
    return '';
  }

  handleValidations = (type, value) => {
    let errorText;
    switch(type) {
      case "card":
        errorText = cardNumberValidation(value);
        this.setState((prevState) => ({
            cardType: this.findDebitCardType(value),
            error: {
              ...prevState.error,
              cardError: errorText,
            },
        }));
        break;
      case "cardHolder":
        errorText = onlyTextValidation(value)
        this.setState((prevState) => ({
          error: {...prevState.error, cardHolderError: errorText}
        }))
        break;
      case "expiry":
        errorText = cardExpireValidation(value)
        this.setState((prevState) => ({
          error: {...prevState.error, expiryError: errorText}
        }))
        break;
      case "securityCode":
        errorText = securityCodeValidation(3, value)
        this.setState((prevState) => ({
          error: {...prevState.error, securityCodeError: errorText}
        }))
        return errorText;
      case 'expiryMonth':
          errorText = cardExpireValidation(this.state.cardData.expiry);
          this.setState(prevState => ({ error: {...prevState.error, expiryError: errorText}}))
          break;
      case 'expiryYear':
          errorText = cardExpireValidation(this.state.cardData.expiry);
          this.setState(prevState => ({ error: {...prevState.error, expiryError: errorText}}))
          break;
      default:
        break;
    }
    return errorText;
  }

  handleInputData = ({target: {name, value}}) => {
    console.log("handle input data")
    console.log("target", name, value)
    if (name === "card") {
      let mask = value.split(' ').join('');
      if (mask.length) {
        console.log("mask", mask)
        mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ');
        this.setState((prevState) => ({
          cardData: {
            ...prevState.cardData,
            [name]: mask,
          },
        }));
      } else {
        this.setState((prevState) => ({
          cardData: {
            ...prevState.cardData,
            [name]: "",
          }}));
      }
    } else {
    this.setState((prevState) => ({
      cardData: {
        ...prevState.cardData,
        [name]: value
      }}));
    }
  }

  checkErrorBeforeSave = (data) => {
    let isError = false;
    Object.keys(data).forEach((val) => {
      isError = isError || !!this.handleValidations(val, data[val])
    })
    return isError
  }

  onPaymentFormSubmit = (event) => {
    event.preventDefault()
    const {showConfirmPayment, handlePaymentData} = this.props
    const fData = new FormData(event.target)
    const paymentData = {
      cardHolder: fData.get("cardHolder"),
      card: fData.get("card"),
      expMonth: fData.get("expMonth"),
      expYear: fData.get("expYear"),
      securityCode: fData.get("securityCode")
    }
    const errorCheck = this.checkErrorBeforeSave(paymentData)
    if (!errorCheck) {
      this.setState({
        cardData: INIT_CARD,
        cardType: null,
      })
      handlePaymentData(paymentData)
      showConfirmPayment(false)
    }
  }

  render() {
    const {getCartSubtotal, userEmail, shippingInfo, 
       backToShipping, summaryData, deliveryCost, cartTotal, discountAmount} = this.props
    const {error, maxLength, cardType, cardData} = this.state
    
    return(
      <div className={s.paymentPage}>
        <BackButton goBackToPage={backToShipping} />
        <ProgressBar completed="75" text="Payment"/>
        <div className={s.paymentContainer}>
          <CartFormContainer 
            error={error}
            summaryData={summaryData}
            cardData={cardData}
            shippingInfo={shippingInfo}
            getCartSubtotal={getCartSubtotal}
            discountAmount={discountAmount}
            deliveryCost={deliveryCost}
            handleInputData={this.handleInputData}
            handleValidations={this.handleValidations}
            maxLength={maxLength}
            payment="true"
            onPaymentFormSubmit={this.onPaymentFormSubmit}
            cardType={cardType}
          />
            <CartSummary 
              summaryData={summaryData}
              discountAmount={discountAmount}
              getCartSubtotal={getCartSubtotal}
              deliveryCost={deliveryCost}
              shippingInfo={shippingInfo}
              userEmail={userEmail}
              paySummary="true"
              cartTotal={cartTotal}
            />
        </div>
      </div>
    )
  }

}

export default Payment;