import React from "react"
import s from "./Form.module.css"
import {countryList} from "../variables"
import InputLabel from "../Form/InputLabel"
import Header from "../Header/Header"
import { monthList, yearList } from "../variables"
import CheckoutButton from "../Buttons/CheckoutButton"


function Form(props) {

  const handleBlur = ({target: {name, value}}) => {
    props.handleValidations(name, value);
  }

    const {onPaymentFormSubmit, deliveryCost, payment, getCartSubtotal, maxLength,
      error, shipping, handleDeliveryMethod, onShippingFormSubmit, handleInputData,
      cardData, cardType, discountAmount} = props

    let shippingInputData = [
      {id: 1, label: "Type of Address", name: "typeOfAddress", type: "text", error: "typeOfAddressError", blur: handleBlur},
      {id: 2, label: "Name - Surname", name: "name", type: "text", error: "nameError", blur: handleBlur},
      {id: 3, label: "Your Address", name: "address", type: "text", error: "addressError", blur: handleBlur},
    ]
    
    let locationInputData = [
      {id: 1, label: "Phone", name: "phone", type: "tel", error: "phoneError", blur: handleBlur},
      {id: 2, label: "Zip", name: "zip", type: "text", error: "zipError", blur: handleBlur},
      {id: 3, label: "City", name: "city", type: "text", error: "cityError", blur: handleBlur},
      {id: 4, label: "State/Province", name: "state", type: "text", error: "stateError", blur: handleBlur}
    ]
  
    let paymentData = [
      {id: 1, label: "Cardholder Name", type: "text", name: "cardHolder", error: "cardHolderError", blur: handleBlur},
      {id: 2, label: "Card Number", type: "text", name: "card", error: "cardError", blur: handleBlur}
    ]
  
    const data = shipping ? shippingInputData : paymentData
  
    const submit = shipping ? onShippingFormSubmit : onPaymentFormSubmit
  
    const subtotal = getCartSubtotal()

    const shippingCost = subtotal < 250 && deliveryCost === 0 ? 25 : deliveryCost;

    const cartTotal = (subtotal - discountAmount) + shippingCost

  return(
    <>
    <form id="shippingForm" className={s.paymentForm} onSubmit={submit}>
    {data.map((input) => (
          <InputLabel 
          key={input.id}
          maxLength={maxLength}
          label={input.label}
          name={input.name}
          type={input.type}
          error={input.error}
          onBlur={input.blur}
          value={cardData && cardData[input.name]}
          onChange={handleInputData}
          cardType={cardType}
          isCard={input.name === "card"}
          errorM={
            (error
            && error[input.error]
            && error[input.error].length > 1)
            ? error[input.error]
            : null
          }
          />))}
      {shipping && 
        <>
        <div className={`locationContainer ${s.inputWrapper}`}>
        {locationInputData.map((input) => (
          <InputLabel 
          key={input.id}
          label={input.label}
          name={input.name}
          onBlur={input.blur}
          type={input.type}
          errorM={
            (error
            && error[input.error]
            && error[input.error].length > 1)
            ? error[input.error]
            : null
            }
            />))}
      </div>
      <div className={s.countrySelect}>
        <label htmlFor="country">Select Country</label>
        <select name="country" id="country" required>
            {countryList.map((optionName, index) => {
              return (
                <option key={index} value={optionName}>
                {optionName}
                </option>
              )
          })}
          </select>
      </div>
      <div className={s.shippingSelection}>
        <Header title="Shipping Method"/>
        <div className={s.shippingRadioBtns}>
          <label >
            <input 
            onClick={(e) => handleDeliveryMethod(e, subtotal)}
            type="radio"
            name="deliveryType"
            defaultChecked
            value="Standard" />
            STANDARD:<span>Delivery in 4-6 Business Days - Free ($250 min)</span>
            </label>
          <label >
            <input 
            onClick={(e) => handleDeliveryMethod(e, subtotal)}
            type="radio" 
            name="deliveryType" 
            value="Express" />
            EXPRESS:<span>Delivery in 1-3 Business Days - $50</span>
          </label>
        </div>
      </div>
      <button id="submitButton" style={{visibility: "hidden"}}>Button</button>
      </>
      }
      {payment && 
        <>
          <div className={s.expDate}>
          <label>Exp.Date</label>
          <div className={s.expItems}>
            <select name="expMonth" id="expMonth" required>
              <option value="" disabled selected>Month</option>
              {monthList.map((optionName, index) => {
              return (
                <option key={index} value={optionName}>
                {optionName}
                </option>
              )
          })}
            </select>
            <select name="expYear" id="expYear" required>
              <option value="" disabled selected>Year</option>
              {yearList.map((optionName, index) => {
              return (
                <option key={index} value={optionName}>
                {optionName}
                </option>
              )
          })}
            </select>
          </div>
        </div>
        <div className={s.cvv}>
          <InputLabel 
          label="CVV"
          name="securityCode"
          onBlur={handleBlur}
          error="securityCodeError"
          type="text"
          maxLength={maxLength}
          onChange={handleInputData}
          errorM={
            (error
            && error["securityCodeError"]
            && error["securityCodeError"].length > 1)
            ? error["securityCodeError"]
            : null
            }
            />
        </div>
        <div className={s.checkoutBtn}>
          <CheckoutButton title={`PAY ${cartTotal.toFixed(2)}`}/>
        </div>
        </>
      }
    </form>
    </>
  )
}


export default Form;