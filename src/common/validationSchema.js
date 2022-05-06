// Author: Harsh Bhatt (B00877053)

import * as yup from "yup";
import { REGEX } from "./utils";

export const LoginSchema = yup.object().shape({
  usernameOrEmail: yup
    .string()
    .trim()
    .required("Please enter your email or username"),
  password: yup.string().required("Please Enter your password"),
});

export const SignupSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Username is required")
    .min(3, "Username should be at least 3 characters")
    .max(15, "Username should be at most 15 characters"),
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .min(3, "First name should be at least 2 characters")
    .max(20, "First name should be at most 20 characters"),
  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .min(3, "Last name should be at least 2 characters")
    .max(20, "Last name should be at most 20 characters"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Please enter valid email"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      REGEX.PASSWORD,
      "Password must contain combination of at least 1 lowercase, 1 uppercase, 1 special characters and numbers"
    ),
  passwordConfirmation: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const ForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Please enter valid email"),
});

export const ResetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .matches(
      REGEX.PASSWORD,
      "Password must contain combination of at least 1 lowercase, 1 uppercase, 1 special characters and numbers"
    ),
  passwordConfirmation: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const ChangePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Please Enter your password"),
  newPassword: yup
    .string()
    .required("Password is required")
    .matches(
      REGEX.PASSWORD,
      "Password must contain combination of at least 1 lowercase, 1 uppercase, 1 special characters and numbers"
    ),
  passwordConfirmation: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export const ProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .min(3, "First name should be at least 2 characters")
    .max(20, "First name should be at most 20 characters"),
  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .min(3, "Last name should be at least 2 characters")
    .max(20, "Last name should be at most 20 characters"),
  phoneNumber: yup
    .string()
    .trim()
    .required("Phone number is required")
    .matches(REGEX.PHONE, "Invalid phone number"),
  address: yup.string().trim().required("Address is required"),
  city: yup.string().trim(),
  gender: yup.string().trim().required("Gender is required"),
  province: yup.string().trim().required("Province is required"),
  postalCode: yup
    .string()
    .trim()
    .required("Postal code is required")
    .matches(REGEX.ZIPCODE, "Invalid postal code"),
});
