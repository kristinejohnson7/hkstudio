import VISA_ICON from "./assets/cardIcons/visa.png";
import AMERICAN_EXPRESS_ICON from "./assets/cardIcons/amex.png";
import MASTER_CARD_ICON from "./assets/cardIcons/masterCard.png";
import DISCOVER_ICON from "./assets/cardIcons/discover.png";

export const OTHERCARDS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const AMERICANEXPRESS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const CARD = ["VISA", "MASTERCARD", "AMERICAN_EXPRESS", "DISCOVER"];

export const CARDICON = {
  VISA: VISA_ICON,
  MASTERCARD: MASTER_CARD_ICON,
  AMERICANEXPRESS: AMERICAN_EXPRESS_ICON,
  DISCOVER: DISCOVER_ICON,
};
