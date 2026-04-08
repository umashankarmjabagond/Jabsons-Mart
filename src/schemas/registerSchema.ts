import * as Yup from "yup";
import { AUTH_VALIDATION } from "@/constants/textConstants";

const registerSchema = Yup.object().shape({
  name: Yup.string().required(AUTH_VALIDATION.NAME_REQUIRED),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, AUTH_VALIDATION.PHONE_INVALID)
    .required(AUTH_VALIDATION.PHONE_REQUIRED),

  email: Yup.string()
    .email(AUTH_VALIDATION.EMAIL_INVALID)
    .required(AUTH_VALIDATION.EMAIL_REQUIRED),

  role: Yup.string().required(AUTH_VALIDATION.ROLE_REQUIRED),

  gstNumber: Yup.string()
    .transform((value) => value?.toUpperCase())
    .when("role", {
      is: "vendor",
      then: (schema) =>
        schema
          .required("GST number is required")
          .matches(
            /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
            "Invalid GST format (Example: 29ABCDE1234F1Z5)",
          ),
      otherwise: (schema) => schema.notRequired(),
    }),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must contain at least one special character",
    ),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], AUTH_VALIDATION.PASSWORD_MATCH)
    .required(AUTH_VALIDATION.CONFIRM_PASSWORD_REQUIRED),

  about: Yup.string().max(300, AUTH_VALIDATION.ABOUT_MAX),
});

export default registerSchema;
