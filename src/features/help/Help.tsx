import { Search } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const Help = () => {
  const [search, setSearch] = useState("");

  const quickActions = [
    "Post a Product",
    "Contact Supplier",
    "Track Orders",
    "Raise Complaint",
  ];

  const categories = [
    {
      title: "Buying & Selling",
      items: [
        {
          name: "Buying on TradeHub",
          desc: "Search and connect with trusted suppliers easily",
          img: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",
        },
        {
          name: "Selling on TradeHub",
          desc: "List your products and grow your business",
          img: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
        },
        {
          name: "Pricing & Negotiation",
          desc: "Get best deals and negotiate with suppliers",
          img: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png",
        },
      ],
    },
    {
      title: "Payments",
      items: [
        {
          name: "Order Tracking",
          desc: "Track your orders in real-time",
          img: "https://cdn-icons-png.flaticon.com/512/891/891462.png",
        },
        {
          name: "Refund Process",
          desc: "Easy and secure refund handling",
          img: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
        },
        {
          name: "Invoices & Billing",
          desc: "Manage invoices and billing details",
          img: "https://cdn-icons-png.flaticon.com/512/2331/2331947.png",
        },
      ],
    },
    {
      title: "Account & Security",
      items: [
        {
          name: "Update Profile",
          desc: "Edit your personal and business details",
          img: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
        },
        {
          name: "Reset Password",
          desc: "Securely reset your account password",
          img: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png",
        },
        {
          name: "Privacy Settings",
          desc: "Control your account privacy and security",
          img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        },
      ],
    },
  ];

  const faqs = [
    {
      q: "How to register as a seller?",
      a: "Go to signup → select vendor → complete GST and business details.",
    },
    {
      q: "How to post a product?",
      a: "Dashboard → Add Product → Fill details → Submit.",
    },
    {
      q: "How to contact supplier?",
      a: "Open product → Click 'Contact Supplier'.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100">
      <Navbar />

      <main className="flex-1 ">
        <section className="py-16 text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            How can we help you?
          </h1>

          <div className="max-w-xl mx-auto relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help articles..."
              className="w-full p-4 rounded-full border shadow-sm"
            />
            <Search className="absolute right-4 top-4 text-gray-400" />
          </div>
        </section>

        <section className="max-w-6xl mx-auto -mt-10 px-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((item, i) => (
              <div
                key={i}
                className="p-4 text-center rounded-xl bg-green-200 hover:bg-teal-50 cursor-pointer transition"
              >
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto py-12 px-6">
          {categories.map((section, i) => (
            <div key={i} className="mb-10">
              <h2 className="text-xl font-bold mb-4">{section.title}</h2>

              <div className="grid md:grid-cols-3 gap-4">
                {section.items.map((item, j) => (
                  <div
                    key={j}
                    className="p-5 bg-white rounded-xl shadow hover:shadow-md cursor-pointer text-center text-black"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-14 h-14 mx-auto mb-3 object-contain"
                    />

                    <h3 className="font-semibold text-black mb-1">
                      {item.name}
                    </h3>

                    <p className="text-sm text-black">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="py-2">
          <div className="max-w-6xl mx-auto px-6 bg-white p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Frequently Asked Questions
            </h2>

            {faqs.map((faq, i) => (
              <details
                key={i}
                className="mb-3 p-4 border rounded-lg cursor-pointer "
              >
                <summary className="font-medium">{faq.q}</summary>
                <p className="mt-2 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="py-12 text-center">
          <h2 className="text-2xl font-bold mb-3">Still need help?</h2>
          <p className="mb-4">Our support team is here to assist you</p>

          <button className="bg-white text-teal-700 px-6 py-2 rounded-full font-semibold">
            Contact Support
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
