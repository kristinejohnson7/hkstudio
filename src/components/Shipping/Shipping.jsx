import React from "react";
import BackButton from "../Buttons/BackButton";
import s from "./Shipping.module.css"
import { onlyNumberValidation } from "../validations";
import CartSummary from "../Cart/CartSummary"
import CartFormContainer from "../Cart/CartFormContainer";
import ProgressBar from "../ProgressBar/ProgressBar";

class Shipping extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: {},
    }
  }

  handleBlur = ({target: {name, value}}) => {
    this.handleValidations(name, value);
  }

  handleValidations = (type, value) => {
    let errorText;
    errorText = onlyNumberValidation(value)
    switch(type) {
      case "zip":
        this.setState((prevState) => ({
          error: {...prevState.error, zipError: errorText}
        }))
        break;
      case "phone": 
        this.setState((prevState) => ({
          error: {...prevState.error, phoneError: errorText}
        }))
        break;
    default:
       this.setState((prevState) => ({
        error: {...prevState.error, [`${type}Error`]: null}
      }))
     break;
  }
  return errorText
}

  checkErrorBeforeSave = (data) => {
    const {error} = this.state
    let errorValue = {};
    let isError = false;
    Object.keys(data).forEach((val) => {
      if(data[val].length === 0 || data[val] === null) {
        errorValue = {...errorValue, [`${val}Error`]: "Required"}
        isError = true;
      }
    })
    Object.keys(error).forEach((val) => {
      if(error[val]) {
        isError = true;
      }
    });
    this.setState({error: errorValue});
    Object.keys(data).forEach((val) => {
      if(data[val].length) {
        this.handleValidations(val, data[val])
      }
    })
    return isError
  }

  onShippingFormSubmit = (event) => {
    event.preventDefault()
    const fData = new FormData(event.target)
    const shippingData = {
      typeOfAddress: fData.get("typeOfAddress"),
      name: fData.get("name"),
      address: fData.get("address"),
      zip: fData.get("zip"),
      country: fData.get("country"),
      city: fData.get("city"),
      state: fData.get("state"),
      phone: fData.get("phone"),
      deliveryType: fData.get("deliveryType") || "Standard"
    }
    const errorCheck = this.checkErrorBeforeSave(shippingData);
    if (!errorCheck) {
      this.props.showPayment(false)
      this.props.handleShippingData(shippingData)
    }
  }
  
  render() {
    const {backToCart, summaryData, getCartSubtotal, handleDeliveryMethod, 
      deliveryCost, discountAmount} = this.props
    const {error} = this.state

    return (
      <div className={s.cartBg}>
         <BackButton goBackToPage={backToCart}/>
         <ProgressBar completed="50" text="Shipping"/>
        <div className={s.cartAndSummaryContainer}>
          <CartFormContainer 
            error={error}
            getCartSubtotal={getCartSubtotal}
            shipping="true"
            handleDeliveryMethod={handleDeliveryMethod}
            deliveryCost={deliveryCost}
            onShippingFormSubmit={this.onShippingFormSubmit}
            handleBlur={this.handleBlur}
            handleValidations={this.handleValidations}
          />
          <CartSummary 
            summaryData={summaryData}
            discountAmount={discountAmount}
            getCartSubtotal={getCartSubtotal}
            deliveryCost={deliveryCost}
            handleDeliveryMethod={handleDeliveryMethod}
            paymentBtn="true"
          />
        </div>
      </div>
    )
  }
}

export default Shipping;