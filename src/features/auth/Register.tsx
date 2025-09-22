import React from "react";
import { Formik, Form } from "formik";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { SelectInput } from "@/components/common/ui/SelectInput";
import { Textarea } from "@/components/common/ui/Textarea";
import registerSchema from "@/schemas/registerSchema";
import { AUTH_TEXT, ROLE_OPTIONS } from "@/constants/textConstants";

const Register: React.FC = () => {
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

  return (
    <>
    <Formik
  initialValues={initialValues}
  validationSchema={registerSchema}
  onSubmit={(values) => {
    console.log("Form Submitted:", values);
  }}
>
  {({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    submitCount, // <- add this
  }) => {
    const showError = (field: string) =>
      (touched[field as keyof typeof touched] || submitCount > 0) &&
      (errors as any)[field]
        ? (errors as any)[field]
        : "";

    return (
      <Form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={AUTH_TEXT.NAME_LABEL}
            placeholder={AUTH_TEXT.NAME_PLACEHOLDER}
            name="name"
            value={values.name}
            className="px-4 py-2"
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError("name")}
          />

          <Input
            label={AUTH_TEXT.PHONE_LABEL}
            placeholder={AUTH_TEXT.PHONE_PLACEHOLDER}
            name="phone"
            value={values.phone}
            className="px-4 py-2"
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError("phone")}
          />
        </div>

        <Input
          label={AUTH_TEXT.EMAIL_LABEL}
          placeholder={AUTH_TEXT.EMAIL_PLACEHOLDER}
          name="email"
          type="email"
          value={values.email}
          className="px-4 py-2"
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError("email")}
        />

        <SelectInput
          label={AUTH_TEXT.ROLE_LABEL}
          name="role"
          value={values.role}
          className="px-4 py-2"
          onChange={handleChange}
          requiredIndicator={true}
          onBlur={handleBlur}
          options={ROLE_OPTIONS}
          error={showError("role")}
        />

        {values.role && (
          <Input
            label={AUTH_TEXT.GST_LABEL}
            placeholder={AUTH_TEXT.GST_PLACEHOLDER}
            name="gstNumber"
            requiredIndicator={false}
            value={values.gstNumber}
            className="px-4 py-2"
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError("gstNumber")}
          />
        )}

        {/* passwords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={AUTH_TEXT.PASSWORD_LABEL}
            placeholder={AUTH_TEXT.PASSWORD_PLACEHOLDER}
            name="password"
            type="password"
            value={values.password}
            className="px-4 py-2"
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError("password")}
          />

          <Input
            label={AUTH_TEXT.CONFIRM_PASSWORD_LABEL}
            placeholder={AUTH_TEXT.CONFIRM_PASSWORD_PLACEHOLDER}
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            className="px-4 py-2"
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError("confirmPassword")}
          />
        </div>

        <Textarea
          label={AUTH_TEXT.ABOUT_LABEL}
          placeholder={AUTH_TEXT.ABOUT_PLACEHOLDER}
          name="about"
          value={values.about}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError("about")}
        />

        <Button type="submit" variant="primary" className="w-full">
          {AUTH_TEXT.SIGNUP_BUTTON}
        </Button>
      </Form>
    );
  }}
</Formik>

    </>
  );
};

export default Register;
