import * as Yup from "yup";

export const getRegisterSchema = (t: (key: string) => string) =>
  Yup.object().shape({
    name: Yup.string().required(() => t("auth.validation.nameRequired")),

    phone: Yup.string()
      .matches(/^[0-9]{10}$/, () => t("auth.validation.phoneInvalid"))
      .required(() => t("auth.validation.phoneRequired")),

    email: Yup.string()
      .email(() => t("auth.validation.emailInvalid"))
      .required(() => t("auth.validation.emailRequired")),

    role: Yup.string().required(() => t("auth.validation.roleRequired")),

    gstNumber: Yup.string().when("role", {
      is: (role: string) => !!role,
      then: (schema) =>
        schema.matches(/^[0-9]{15}$/, () => t("auth.validation.gstInvalid")),
      otherwise: (schema) => schema.notRequired(),
    }),

    password: Yup.string()
      .min(6, () => t("auth.validation.passwordMin"))
      .required(() => t("auth.validation.passwordRequired")),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], () => t("auth.validation.passwordMatch"))
      .required(() => t("auth.validation.confirmPasswordRequired")),

    about: Yup.string()
      .max(300, () => t("auth.validation.aboutMax"))
      .notRequired(),
  });
