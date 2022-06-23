import s from "./InputLabel.module.css";
import { CARD, CARDICON } from "../../constantVariables/cardVariables";
import React from "react";

const InputLabel = (props) => {
  const {
    type,
    label,
    name,
    errorM,
    error,
    onPasswordVisibility,
    isPasswordShown,
    isCard,
    cardType,
    ...inputProps
  } = props;

  return (
    <div className={s.inputWrapper}>
      <label>{label}</label>
      <input name={name} type={type} {...inputProps} />
      {(name === "password" || name === "confirmPassword") && (
        <i
          className={`fa ${isPasswordShown ? "fa-eye-slash" : "fa-eye"} ${
            s.passwordIcon
          }`}
          onClick={onPasswordVisibility}
        />
      )}
      {errorM && <div className={s.error}>{errorM}</div>}
      {(!error || !error.cardError) && isCard && CARD.includes(cardType) && (
        <img
          style={{
            position: "absolute",
            top: "5px",
            right: "170px",
            width: "50px",
            height: "33px",
          }}
          src={CARDICON[cardType]}
          alt="card"
        />
      )}
    </div>
  );
};

export default InputLabel;
