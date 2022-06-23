import React, { useContext } from "react";
import s from "./Form.module.css";
import InputLabel from "../Form/InputLabel";
import Header from "../Header/Header";
import CheckoutButton from "../Buttons/CheckoutButton";
import { userContext } from "../Helper/Context";
import {
  shippingInputData,
  locationInputData,
  paymentData,
  shippingMethods,
  monthList,
  yearList,
  countryList,
} from "../../constantVariables/formData";

function Form(props) {
  const {
    handleDeliveryMethod,
    deliveryCost,
    cartSubtotal,
    cartDiscount,
  } = useContext(userContext);

  const {
    onPaymentFormSubmit,
    payment,
    maxLength,
    error,
    shipping,
    onShippingFormSubmit,
    handleInputData,
    cardData,
    cardType,
    handleValidations,
  } = props;

  const handleBlur = ({ target: { name, value } }) => {
    handleValidations(name, value);
    return;
  };

  const data = shipping ? shippingInputData : paymentData;

  const submit = shipping ? onShippingFormSubmit : onPaymentFormSubmit;

  const shippingCost =
    cartSubtotal < 250 && deliveryCost === 0 ? 25 : deliveryCost;

  const cartTotal = cartSubtotal - cartDiscount + shippingCost;

  return (
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
            onBlur={handleBlur}
            value={cardData && cardData[input.name]}
            onChange={handleInputData}
            cardType={cardType}
            isCard={input.name === "card"}
            errorM={
              error && error[input.error] && error[input.error].length > 1
                ? error[input.error]
                : null
            }
          />
        ))}
        {shipping && (
          <>
            <div className={`locationContainer ${s.inputWrapper}`}>
              {locationInputData.map((input) => (
                <InputLabel
                  key={input.id}
                  label={input.label}
                  name={input.name}
                  onBlur={handleBlur}
                  type={input.type}
                  errorM={
                    error && error[input.error] && error[input.error].length > 1
                      ? error[input.error]
                      : null
                  }
                />
              ))}
            </div>
            <div className={s.countrySelect}>
              <label htmlFor="country">Select Country</label>
              <select name="country" id="country" required>
                {countryList.map((optionName, index) => {
                  return (
                    <option key={index} value={optionName}>
                      {optionName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={s.shippingSelection}>
              <Header title="Shipping Method" />
              <div className={s.shippingRadioBtns}>
                {shippingMethods.map((item) => (
                  <label>
                    <input
                      key={item.id}
                      onClick={(e) => handleDeliveryMethod(e, cartSubtotal)}
                      type="radio"
                      name="deliveryType"
                      defaultChecked={item.defaultChecked}
                      value={item.value}
                    />
                    {item.value.toUpperCase()}:<span>{item.message}</span>
                  </label>
                ))}
              </div>
            </div>
            <button id="submitButton" style={{ visibility: "hidden" }}>
              Button
            </button>
          </>
        )}
        {payment && (
          <>
            <div className={s.expDate}>
              <label>Exp.Date</label>
              <div className={s.expItems}>
                <select name="expMonth" id="expMonth" required>
                  <option value="" disabled selected>
                    Month
                  </option>
                  {monthList.map((optionName, index) => {
                    return (
                      <option key={index} value={optionName}>
                        {optionName}
                      </option>
                    );
                  })}
                </select>
                <select name="expYear" id="expYear" required>
                  <option value="" disabled selected>
                    Year
                  </option>
                  {yearList.map((optionName, index) => {
                    return (
                      <option key={index} value={optionName}>
                        {optionName}
                      </option>
                    );
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
                  error &&
                  error["securityCodeError"] &&
                  error["securityCodeError"].length > 1
                    ? error["securityCodeError"]
                    : null
                }
              />
            </div>
            <div className={s.checkoutBtn}>
              <CheckoutButton title={`PAY $ ${cartTotal}`} />
            </div>
          </>
        )}
      </form>
    </>
  );
}

export default Form;
