import moment from "moment";

export const cardNumberValidation = (cardNumber) => {
  if (!cardNumber) {
    return "Enter a valid card";
  }
  const regexPattern = {
    MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    VISA: /^4[0-9]{2,}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
  };
  for (const card in regexPattern) {
    if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card])) {
      if (cardNumber) {
        return cardNumber &&
          /^[1-6]{1}[0-9]{14,15}$/i.test(
            cardNumber.replace(/[^\d]/g, "").trim()
          )
          ? ""
          : "Enter a valid Card";
      }
    }
  }
  return "Enter a valid Card";
};

export const cardExpireValidation = (value) => {
  if (!value) {
    return "Enter an expiry date";
  }
  if (value) {
    if (/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())) {
      let today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      ).getDate()}`;
      let currentDate = moment(new Date(date));
      let visaValue = value.split("/");
      let visaDate = new Date(`20${visaValue[1]}`, visaValue[0], 0);
      return currentDate < moment(visaDate)
        ? undefined
        : "Please enter a valid date";
    } else {
      return "Invalid date format";
    }
  }
};

export const securityCodeValidation = (min, value) =>
  (value && value.length < min) || !value
    ? "Must be 3 characters or more"
    : undefined;

export const onlyTextValidation = (value) => {
  if (value) {
    if (/^[a-zA-Z ]*$/i.test(value)) {
      return undefined;
    } else {
      return "Alphabetical letters only";
    }
  } else {
    return "Enter a value";
  }
};

export const onlyNumberValidation = (value) => {
  if (value) {
    const pattern = /^\d*[.]?\d*$/;
    if (pattern.test(Number(value))) {
      return undefined;
    } else {
      return "Numerical values only";
    }
  } else {
    return "Please enter a value";
  }
};

export const passwordValidation = (value) => {
  if (value) {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
    if (pattern.test(value)) {
      return undefined;
    } else {
      return "Password must be a minimum of 8 characters. Minimum of 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number.";
    }
  } else {
    return "Please enter a value";
  }
};
