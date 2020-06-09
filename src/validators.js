import * as yup from "yup";

// const onlyNumber = /^[0-9]*$/;
// const expiryDateRegExp = /((0{1}[1-9]{1})|(1{1}[0-2]{1}))([2-9]{1}[0-9]{1})/;
const nameRegExp = /^(?=.{1,60}$)[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$/;
// const passwordRegExp = /^[^ ]*$/;

export const validateEmail = () =>
  yup.string().trim().email("invalid email").required("required");

export const validateHorseName = () =>
  yup
    .string()
    .matches(nameRegExp, "invalid mame")
    .max(255, "max 255 characters allowed")
    .required("required");
export const validateHorseNumber = () => yup.string().max(100, "max 100 ");
