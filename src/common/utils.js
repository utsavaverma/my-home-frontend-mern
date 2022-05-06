// Author: Harsh Bhatt (B00877053)

export const REGEX = {
  NAME: /^[a-zA-Z ]*$/,
  ZIPCODE:
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/,
  CITY: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
  WEB_URL:
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
  // Canadian numbers only
  PHONE: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
  EMAIL: /^[a-z0-9.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  AMOUNT: /^\d+$|^\d+\.\d*$/,
  OPTIONALNEGATIVEAMOUNT: /^[-]?\d+$|^[-]?\d+\.\d*$/,
  NUMBER: /^\d+$/,
};
