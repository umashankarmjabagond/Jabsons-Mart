import React, { useMemo } from "react";
import { Formik, Form } from "formik";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { SelectInput } from "@/components/common/ui/SelectInput";
import { Textarea } from "@/components/common/ui/Textarea";
import { ROUTES } from "@/constants/routeConstants";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROLE_VALUES } from "@/constants/textConstants";
import { getRegisterSchema } from "@/schemas/registerSchema";

const Register: React.FC = () => {
  const { t, i18n } = useTranslation();

  const registerSchema = useMemo(() => getRegisterSchema(t), [i18n.language]);

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    role: "",
    gstNumber: "",
    password: "",
    confirmPassword: "",
    about: "",
  };

  const ROLE_OPTIONS = useMemo(
    () =>
      ROLE_VALUES.map((r) => ({
        value: r.value,
        label: t(`roles.${r.value}`, r.value),
      })),
    [i18n.language]
  );

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={() => {
          alert(t("AUTH.SIGNUP_BUTTON") || "Register Successfully!");
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          submitCount,
        }) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t("AUTH.NAME_LABEL")}
                placeholder={t("AUTH.NAME_PLACEHOLDER")}
                name="name"
                value={values.name}
                className="px-4 py-2"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  (touched.name || submitCount > 0) && errors.name
                    ? (errors.name as string)
                    : ""
                }
              />

              <Input
                label={t("AUTH.PHONE_LABEL")}
                placeholder={t("AUTH.PHONE_PLACEHOLDER")}
                name="phone"
                value={values.phone}
                className="px-4 py-2"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  (touched.phone || submitCount > 0) && errors.phone
                    ? (errors.phone as string)
                    : ""
                }
              />
            </div>

            <Input
              label={t("AUTH.EMAIL_LABEL")}
              placeholder={t("AUTH.EMAIL_PLACEHOLDER")}
              name="email"
              type="email"
              value={values.email}
              className="px-4 py-2"
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                (touched.email || submitCount > 0) && errors.email
                  ? (errors.email as string)
                  : ""
              }
            />

            <SelectInput
              label={t("AUTH.ROLE_LABEL")}
              name="role"
              value={values.role}
              className="px-4 py-2"
              onChange={handleChange}
              onBlur={handleBlur}
              requiredIndicator={true}
              options={ROLE_OPTIONS}
              error={
                (touched.role || submitCount > 0) && errors.role
                  ? (errors.role as string)
                  : ""
              }
            />

            {values.role === "vendor" && (
              <Input
                label={t("AUTH.GST_LABEL")}
                placeholder={t("AUTH.GST_PLACEHOLDER")}
                name="gstNumber"
                value={values.gstNumber}
                className="px-4 py-2"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  (touched.gstNumber || submitCount > 0) && errors.gstNumber
                    ? (errors.gstNumber as string)
                    : ""
                }
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t("AUTH.PASSWORD_LABEL")}
                placeholder={t("AUTH.PASSWORD_PLACEHOLDER")}
                name="password"
                type="password"
                value={values.password}
                className="px-4 py-2"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  (touched.password || submitCount > 0) && errors.password
                    ? (errors.password as string)
                    : ""
                }
              />

              <Input
                label={t("AUTH.CONFIRM_PASSWORD_LABEL")}
                placeholder={t("AUTH.CONFIRM_PASSWORD_PLACEHOLDER")}
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                className="px-4 py-2"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  (touched.confirmPassword || submitCount > 0) &&
                  errors.confirmPassword
                    ? (errors.confirmPassword as string)
                    : ""
                }
              />
            </div>

            <Textarea
              label={t("AUTH.ABOUT_LABEL")}
              placeholder={t("AUTH.ABOUT_PLACEHOLDER")}
              name="about"
              value={values.about}
              className="px-4 py-2"
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                (touched.about || submitCount > 0) && errors.about
                  ? (errors.about as string)
                  : ""
              }
            />

            <Button type="submit" variant="primary" className="w-full">
              {t("AUTH.SIGNUP_BUTTON")}
            </Button>
          </Form>
        )}
      </Formik>

      <p className="text-center text-sm text-gray-600 mt-6">
        {t("AUTH.ALREADY_HAVE_ACCOUNT")}{" "}
        <Link
          to={`${ROUTES.AUTH}${ROUTES.LOGIN}`}
          className="text-green-600 hover:underline"
        >
          {t("AUTH.LOGIN_BUTTON")}
        </Link>
      </p>
    </>
  );
};

export default Register;
