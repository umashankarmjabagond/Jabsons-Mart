export const APP_NAME = "FarmerMart";

export const AUTH_TEXT = {
  LOGIN_TITLE: "Login to your account",
  REGISTER_TITLE: "Create your account",
  SIGNUP_BUTTON: "Sign Up",
  NAME_LABEL: "Full Name",
  NAME_PLACEHOLDER: "Enter your full name",
  PHONE_LABEL: "Phone Number",
  PHONE_PLACEHOLDER: "Enter your phone number",
  EMAIL_LABEL: "Email Address",
  EMAIL_PLACEHOLDER: "Enter your email",
  ROLE_LABEL: "Role",
  ROLE_PLACEHOLDER: "Select your role",
  GST_LABEL: "GST Number",
  GST_PLACEHOLDER: "Enter your GST number",
  PASSWORD_LABEL: "Password",
  PASSWORD_PLACEHOLDER: "Enter your password",
  CONFIRM_PASSWORD_LABEL: "Confirm Password",
  CONFIRM_PASSWORD_PLACEHOLDER: "Re-enter your password",
  ABOUT_LABEL: "About",
  ABOUT_PLACEHOLDER: "Tell us about yourself...",
} as const;

export const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
  { label: "Vendor/Farmer", value: "vendor" },
  { label: "Consultant", value: "consultant" },
] as const;
