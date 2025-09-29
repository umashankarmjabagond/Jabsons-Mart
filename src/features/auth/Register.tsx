import React from "react";
import { Formik, Form } from "formik";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { SelectInput } from "@/components/common/ui/SelectInput";
import { Textarea } from "@/components/common/ui/Textarea";
import registerSchema from "@/schemas/registerSchema";
import { AUTH_TEXT, ROLE_OPTIONS } from "@/constants/textConstants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routeConstants";
import { registerUser } from "@/services/auth";
import { showLoading, dismissToast, showSuccess, showError } from "@/components/common/Toast/toast";
import { Toaster } from "react-hot-toast";

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

  const navigate = useNavigate();

  const handleSubmit = async (values: typeof initialValues, { setSubmitting, setErrors }: any) => {
    // Show loading toast with infinite duration
    const toastId = showLoading("Registering your account...", { duration: Infinity });

    try {
      // Map phone → contact and remove confirmPassword
      const { phone, confirmPassword, ...rest } = values;
      const payload = { ...rest, contact: phone };
      console.log("Payload to backend:", payload);

      // Call backend API
      await registerUser(payload);

      // Dismiss loading toast
      dismissToast(toastId);

      // Show success toast
      showSuccess("Account created successfully! Please login.");

      // Delay navigation so toast is visible
      setTimeout(() => {
        navigate(`${ROUTES.AUTH}${ROUTES.LOGIN}`);
      }, 1500); // 1.5 seconds delay
    } catch (err: any) {
      // Dismiss loading toast
      dismissToast(toastId);

      // Show error toast
      showError(err.message || "Something went wrong.");

      // Set form errors if any
      if (err.errors) setErrors(err.errors);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: "12px", padding: "12px 16px", fontSize: "14px" },
          success: { style: { background: "#ecfdf5", color: "#065f46", border: "1px solid #10b981" }, iconTheme: { primary: "#10b981", secondary: "#ecfdf5" } },
          error: { style: { background: "#fef2f2", color: "#991b1b", border: "1px solid #ef4444" }, iconTheme: { primary: "#ef4444", secondary: "#fef2f2" } },
          loading: { style: { background: "#f3f4f6", color: "#111827", border: "1px solid #9ca3af" } },
        }}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, submitCount, isSubmitting }) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={AUTH_TEXT.NAME_LABEL}
                placeholder={AUTH_TEXT.NAME_PLACEHOLDER}
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(touched.name || submitCount > 0) && errors.name ? errors.name : ""}
                autoComplete="name"
                className="px-4 py-2"
              />
              <Input
                label={AUTH_TEXT.PHONE_LABEL}
                placeholder={AUTH_TEXT.PHONE_PLACEHOLDER}
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(touched.phone || submitCount > 0) && errors.phone ? errors.phone : ""}
                autoComplete="tel"
                className="px-4 py-2"
              />
            </div>

            <Input
              label={AUTH_TEXT.EMAIL_LABEL}
              placeholder={AUTH_TEXT.EMAIL_PLACEHOLDER}
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={(touched.email || submitCount > 0) && errors.email ? errors.email : ""}
              autoComplete="email"
              className="px-4 py-2"
            />

            <SelectInput
              label={AUTH_TEXT.ROLE_LABEL}
              name="role"
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
              options={ROLE_OPTIONS}
              error={(touched.role || submitCount > 0) && errors.role ? errors.role : ""}
              className="px-4 py-2"
            />

            {values.role === "vendor" && (
              <Input
                label={AUTH_TEXT.GST_LABEL}
                placeholder={AUTH_TEXT.GST_PLACEHOLDER}
                name="gstNumber"
                value={values.gstNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(touched.gstNumber || submitCount > 0) && errors.gstNumber ? errors.gstNumber : ""}
                className="px-4 py-2"
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={AUTH_TEXT.PASSWORD_LABEL}
                placeholder={AUTH_TEXT.PASSWORD_PLACEHOLDER}
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(touched.password || submitCount > 0) && errors.password ? errors.password : ""}
                autoComplete="new-password"
                className="px-4 py-2"
              />
              <Input
                label={AUTH_TEXT.CONFIRM_PASSWORD_LABEL}
                placeholder={AUTH_TEXT.CONFIRM_PASSWORD_PLACEHOLDER}
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(touched.confirmPassword || submitCount > 0) && errors.confirmPassword ? errors.confirmPassword : ""}
                autoComplete="new-password"
                className="px-4 py-2"
              />
            </div>

            <Textarea
              label={AUTH_TEXT.ABOUT_LABEL}
              placeholder={AUTH_TEXT.ABOUT_PLACEHOLDER}
              name="about"
              value={values.about}
              onChange={handleChange}
              onBlur={handleBlur}
              error={(touched.about || submitCount > 0) && errors.about ? errors.about : ""}
              className="px-4 py-2"
            />

            <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
              {AUTH_TEXT.SIGNUP_BUTTON}
            </Button>

            <p className="text-center text-sm text-gray-600 m-0 py-2">
              {AUTH_TEXT.ALREADY_HAVE_ACCOUNT}
              <button
                type="button"
                onClick={() => navigate(`${ROUTES.AUTH}${ROUTES.LOGIN}`)}
                className="text-green-600 font-semibold hover:underline"
              >
                {AUTH_TEXT.TITLE}
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
