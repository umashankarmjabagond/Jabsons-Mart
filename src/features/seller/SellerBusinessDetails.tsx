import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Building2, Mail, User } from "lucide-react";
interface BusinessFormValues {
  name: string;
  companyName: string;
  pinCode: string;
  city: string;
  state: string;
  email: string;
}

interface Props {
  onNext: () => void;
  onPrevious: () => void;
}

const SellerBusinessDetails: React.FC<Props> = ({ onNext, onPrevious }) => {
  const formik = useFormik<BusinessFormValues>({
    initialValues: {
      name: "",
      companyName: "",
      pinCode: "",
      city: "",
      state: "",
      email: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required*"),
      companyName: Yup.string().required("Company name cannot be blank*"),
      pinCode: Yup.string()
        .matches(/^\d{6}$/, "Enter a valid 6-digit PIN code*")
        .required("PIN Code is required*"),
      city: Yup.string().required("City is required*"),
      state: Yup.string().required("State is required*"),
      email: Yup.string()
        .email("Invalid email*")
        .required("Email is required*"),
    }),

    onSubmit: (values) => {
      // ✅ Save data (so when user comes back it persists)
      localStorage.setItem("sellerBusiness", JSON.stringify(values));

      onNext(); // go to Product step
    },
  });

  // ✅ Load saved data when coming back
  useEffect(() => {
    const saved = localStorage.getItem("sellerBusiness");
    if (saved) {
      formik.setValues(JSON.parse(saved));
    }
  }, []);

  return (
    <section className="flex flex-col md:flex-row justify-center items-start gap-6 md:gap-10 lg:gap-16 bg-gray-50 px-6 py-10">
      {/* LEFT SIDE */}
      <div className="w-full md:w-[60%] bg-white shadow-lg rounded-xl p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6">
          <p className="text-green-600 font-medium text-sm">
            ✅ Account created successfully
          </p>
          <h2 className="text-2xl font-bold text-blue-700 mt-2">
            Business Details
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Start adding your business details:
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="block font-medium text-start">
              Your Name<span className="text-red-500">*</span>
            </label>

            <div
              className={`flex items-center border rounded-md px-3 py-2 ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <User className="w-5 h-5 text-gray-500 mr-2" />
              <input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your name"
                className="w-full outline-none"
              />
            </div>

            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>

          {/* COMPANY */}
          <div>
            <label className="block font-medium text-start">
              Company Name<span className="text-red-500">*</span>
            </label>

            <div className="flex items-center border rounded-md px-3 py-2">
              <Building2 className="w-5 h-5 text-gray-500 mr-2" />
              <input
                name="companyName"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                placeholder="Company name"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* PIN / CITY / STATE */}
          <div className="grid grid-cols-3 gap-3">
            <input
              name="pinCode"
              placeholder="PIN"
              value={formik.values.pinCode}
              onChange={formik.handleChange}
              className="border p-2 rounded"
            />
            <input
              name="city"
              placeholder="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              className="border p-2 rounded"
            />
            <input
              name="state"
              placeholder="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              className="border p-2 rounded"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label>Email</label>
            <div className="flex border rounded-md px-3 py-2">
              <Mail className="w-5 h-5 text-gray-500 mr-2" />
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Enter email"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* 🔥 BUTTONS */}
          <div className="flex justify-between mt-6">
            {/* PREVIOUS */}
            <button type="button" onClick={onPrevious}>
              ← Previous
            </button>

            {/* NEXT */}
            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded-md"
            >
              Continue →
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-[35%] bg-white shadow-lg rounded-xl p-6">
        <h3 className="font-semibold mb-4">Profile Preview</h3>

        <p>
          <b>Name:</b> {formik.values.name || "-"}
        </p>
        <p>
          <b>City:</b> {formik.values.city || "-"}
        </p>
        <p>
          <b>Email:</b> {formik.values.email || "-"}
        </p>
      </div>
    </section>
  );
};

export default SellerBusinessDetails;
