import { ShieldCheck, Leaf, TrendingUp } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/common/ui/Button";

const validationSchema = Yup.object({
  product: Yup.string().required("Please enter your Product details"),
  mobile: Yup.string()
    .matches(/^[0-9]{7,15}$/, "Invalid Mobile Number")
    .required("Please enter your mobile number"),
});

const BannerSection = () => {
  const { t } = useTranslation();

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-green-100">
          <span className="inline-block mb-4 px-4 py-1 bg-green-400 text-black-900 rounded-full text-sm">
            🌐 Trade Hub Network
          </span>

          <h1 className="text-4xl font-bold text-black-900 leading-tight">
            Real Suppliers.
            <br />
            Real Products.
            <br />
            Direct Trade.
          </h1>

          <p className="mt-4 text-black-900 text-lg max-w-xl">
            Trade Hub connects verified suppliers, farmers, and manufacturers
            directly with businesses, exporters, and bulk buyers — eliminating
            middlemen and enabling smarter trade.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StoryCard
              icon={<Leaf />}
              title="Direct Sourcing"
              desc="Connect with suppliers, farmers & manufacturers"
            />
            <StoryCard
              icon={<ShieldCheck />}
              title="Verified Network"
              desc="Trusted sellers with quality assurance"
            />
            <StoryCard
              icon={<TrendingUp />}
              title="Smart Pricing"
              desc="Better deals through transparent trading"
            />
          </div>
        </div>

        <div className="relative bg-black-900 rounded-3xl p-8 shadow-2xl border border-white/10">
          {/* TITLE */}
          <h3 className="text-xl font-semibold mb-2 text-green-500">
            Request a Quote (RFQ)
          </h3>

          <p className="text-green-500 mb-6 text-sm">
            Tell us your requirement. We’ll connect you with the right sellers
            instantly.
          </p>

          <Formik
            initialValues={{ product: "", mobile: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              alert(
                `Thank you.
We have received your enquiry , our team will contact you very soon.`,
              );
              resetForm();
            }}
          >
            {() => (
              <Form className="space-y-5">
                <div className="text-red-500">
                  <Field
                    name="product"
                    placeholder="Product (e.g. Rice, Steel, Vegetables)"
                    className="w-full px-4 py-3 rounded-xl text-black-900"
                  />
                  <ErrorMessage
                    name="product"
                    component="div"
                    className="!text-red-500 text-xs mt-1"
                  >
                    {(msg) => t(msg)}
                  </ErrorMessage>
                </div>

                <div className="text-red-500">
                  <Field
                    name="mobile"
                    placeholder="Mobile number"
                    className="w-full px-4 py-3 rounded-xl text-black-900"
                  />
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="!text-red-500 text-xs mt-1"
                  >
                    {(msg) => t(msg)}
                  </ErrorMessage>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-300 hover:!bg-green-400 text-green-700 font-semibold rounded-xl py-3"
                >
                  Connect to Sellers
                </Button>
              </Form>
            )}
          </Formik>

          <br />
          <div className="text-green-500">
            <h2 className="font-bold">Other ways to reach us</h2>

            <p>
              Email –{" "}
              <a
                href="mailto:umashankarjabagond@gmail.com"
                className="underline hover:text-green-600"
              >
                umashankarjabagond@gmail.com
              </a>
            </p>

            <p>
              Call / WhatsApp –{" "}
              <a
                href="https://wa.me/919823191415"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-green-600"
              >
                9823191415
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <TrustMetric value="10,000+" label="Verified Suppliers" />
        <TrustMetric value="1M+" label="Orders Facilitated" />
        <TrustMetric value="500+" label="Cities & Regions" />
        <TrustMetric value="98%" label="Client Satisfaction" />
      </div>
    </section>
  );
};

export default BannerSection;

const StoryCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="p-4 rounded-2xl bg-green-100 text-center">
    <div className="flex justify-center mb-2 text-green-700">{icon}</div>
    <p className="font-semibold text-green-700">{title}</p>
    <p className="text-sm text-gray-600 mt-1 text-green-700">{desc}</p>
  </div>
);

const TrustMetric = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition">
    <p className="text-3xl font-bold text-green-700">{value}</p>
    <p className="text-sm text-black-900 mt-1">{label}</p>
  </div>
);
