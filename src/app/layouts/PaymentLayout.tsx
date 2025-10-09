import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React, { useState } from "react";

const PaymentLayout: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [selectedBank, setSelectedBank] = useState("");
  const [upiInput, setUpiInput] = useState("");
  const [cardInput, setCardInput] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });

  const [savedUPIs, setSavedUPIs] = useState<string[]>([]);
  const [savedCards, setSavedCards] = useState<string[]>([]);
  const [selectedUPI, setSelectedUPI] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [errors, setErrors] = useState<{ upi?: string; card?: string }>({});

  const validateUPI = (upi: string): boolean => {
    if (!upi.trim()) {
      setErrors({ upi: "UPI ID cannot be empty." });
      return false;
    } else if (!/^[\w.\-_]{3,}@[\w]{3,}$/.test(upi)) {
      setErrors({ upi: "Enter a valid UPI ID (e.g., name@bank)." });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateCard = (card: { number: string; expiry: string; cvv: string }): boolean => {
    if (!/^\d{16}$/.test(card.number)) {
      setErrors({ card: "Card number must be 16 digits." });
      return false;
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) {
      setErrors({ card: "Enter valid expiry in MM/YY format." });
      return false;
    } else if (!/^\d{3}$/.test(card.cvv)) {
      setErrors({ card: "CVV must be 3 digits." });
      return false;
    }
    setErrors({});
    return true;
  };

  const saveUPI = () => {
    if (validateUPI(upiInput)) {
      if (upiInput.trim() && !savedUPIs.includes(upiInput)) {
        setSavedUPIs([...savedUPIs, upiInput]);
        setUpiInput("");
      }
    }
  };

  const saveCard = () => {
    if (validateCard(cardInput)) {
      if (cardInput.number.trim() && !savedCards.includes(cardInput.number)) {
        setSavedCards([...savedCards, cardInput.number]);
        setCardInput({ number: "", expiry: "", cvv: "" });
      }
    }
  };

  const removeSaved = (type: "upi" | "card", value: string) => {
    if (type === "upi") setSavedUPIs(savedUPIs.filter((id) => id !== value));
    else setSavedCards(savedCards.filter((num) => num !== value));
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-50 pt-5">
        <div className="flex items-center gap-3 py-4 border-b px-4 bg-white shadow-sm">
          <span className="text-3xl cursor-pointer flex items-center gap-2">
            &larr;{" "}
            <span className="text-2xl font-semibold">Complete Payment</span>
          </span>
        </div>

        <div className="grid gap-4 border-t p-5 min-h-[80vh] grid-cols-1 md:grid-cols-[1.2fr_1.8fr] lg:grid-cols-[1.2fr_1.3fr_1.4fr]">
          {/* 🔹 Left Section */}
          <div className="border rounded-xl bg-white shadow-sm p-4 flex flex-col gap-3">
            <h2 className="text-lg font-semibold mb-2">Payment Options</h2>
            {[
              { key: "upi", label: "UPI", icon: "📱" },
              { key: "card", label: "Credit / Debit / ATM Card", icon: "💳" },
              { key: "emi", label: "EMI", icon: "💰" },
              { key: "netbanking", label: "Net Banking", icon: "🏦" },
              { key: "gift", label: "Gift Card", icon: "🎁" },
              { key: "cod", label: "Cash on Delivery", icon: "💵" },
            ].map((option) => (
              <div
                key={option.key}
                onClick={() => setSelectedMethod(option.key)}
                className={`border rounded-md flex items-center gap-3 p-3 cursor-pointer transition-all ${
                  selectedMethod === option.key
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-100"
                }`}
              >
                <span className="text-xl">{option.icon}</span>
                <h1 className="font-medium">{option.label}</h1>
              </div>
            ))}
          </div>

          <div className="border rounded-xl bg-white shadow-sm p-6 overflow-auto">
            {selectedMethod === "upi" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Pay via UPI</h2>

                <input
                  type="text"
                  value={upiInput}
                  onChange={(e) => setUpiInput(e.target.value)}
                  placeholder="Enter UPI ID (example: name@upi)"
                  className="border p-2 w-full rounded-md mb-1 focus:ring-2 focus:ring-blue-400"
                />
                {errors.upi && (
                  <p className="text-red-500 text-sm mb-2">{errors.upi}</p>
                )}

                <button
                  onClick={saveUPI}
                  className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
                >
                  Save UPI
                </button>

                {savedUPIs.length > 0 && (
                  <div className="mt-5">
                    <h3 className="font-semibold mb-2">Saved UPI IDs</h3>
                    <div className="space-y-2">
                      {savedUPIs.map((upi) => (
                        <div
                          key={upi}
                          className={`flex justify-between items-center border rounded-md p-3 cursor-pointer transition-all ${
                            selectedUPI === upi
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:bg-gray-100"
                          }`}
                          onClick={() => setSelectedUPI(upi)}
                        >
                          <span>{upi}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSaved("upi", upi);
                            }}
                            className="text-red-600 hover:underline text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>

                    {selectedUPI && (
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold w-full py-2 mt-3 rounded-md">
                        Pay ₹27,078
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {selectedMethod === "card" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Pay using Credit / Debit Card
                </h2>

                <input
                  type="text"
                  value={cardInput.number}
                  onChange={(e) =>
                    setCardInput({ ...cardInput, number: e.target.value })
                  }
                  placeholder="Card Number"
                  className="border p-2 w-full rounded-md mb-1"
                />
                <div className="grid grid-cols-2 gap-2 mb-1">
                  <input
                    type="text"
                    value={cardInput.expiry}
                    onChange={(e) =>
                      setCardInput({ ...cardInput, expiry: e.target.value })
                    }
                    placeholder="Expiry (MM/YY)"
                    className="border p-2 rounded-md"
                  />
                  <input
                    type="text"
                    value={cardInput.cvv}
                    onChange={(e) =>
                      setCardInput({ ...cardInput, cvv: e.target.value })
                    }
                    placeholder="CVV"
                    className="border p-2 rounded-md"
                  />
                </div>
                {errors.card && (
                  <p className="text-red-500 text-sm mb-2">{errors.card}</p>
                )}

                <button
                  onClick={saveCard}
                  className="bg-blue-600 text-white px-5 py-2 mt-2 rounded-md hover:bg-blue-700"
                >
                  Save Card
                </button>

                {savedCards.length > 0 && (
                  <div className="mt-5">
                    <h3 className="font-semibold mb-2">Saved Cards</h3>
                    <div className="space-y-2">
                      {savedCards.map((card) => (
                        <div
                          key={card}
                          className={`flex justify-between items-center border rounded-md p-3 cursor-pointer transition-all ${
                            selectedCard === card
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:bg-gray-100"
                          }`}
                          onClick={() => setSelectedCard(card)}
                        >
                          <span>**** **** **** {card.slice(-4)}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSaved("card", card);
                            }}
                            className="text-red-600 hover:underline text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>

                    {selectedCard && (
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold w-full py-2 mt-3 rounded-md">
                        Pay ₹27,078
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {selectedMethod === "emi" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">EMI Options</h2>
                <p className="text-gray-600 mb-3">
                  Get easy EMI on major banks and credit cards.
                </p>
                <button className="border px-4 py-2 rounded-md hover:bg-gray-100">
                  View EMI Plans
                </button>
              </div>
            )}

            {selectedMethod === "netbanking" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Net Banking</h2>
                <p className="text-gray-600 mb-3">
                  Choose your preferred bank to complete payment.
                </p>

                <div className="flex flex-col gap-3">
                  {[
                    { name: "State Bank of India", logo: "🏦" },
                    { name: "HDFC Bank", logo: "🏛️" },
                    { name: "ICICI Bank", logo: "🏦" },
                    { name: "Kotak Mahindra Bank", logo: "🏛️" },
                    { name: "Axis Bank", logo: "🏦" },
                    { name: "Federal Bank", logo: "🏦" },
                    { name: "Indian Overseas Bank", logo: "🏛️" },
                  ].map((bank, index) => (
                    <div key={index}>
                      <label
                        className={`flex justify-between items-center border rounded-md p-3 cursor-pointer transition-all ${
                          selectedBank === bank.name
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="bank"
                            value={bank.name}
                            checked={selectedBank === bank.name}
                            onChange={() => setSelectedBank(bank.name)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="font-medium">{bank.name}</span>
                        </div>
                        <span className="text-2xl">{bank.logo}</span>
                      </label>

                      {selectedBank === bank.name && (
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold w-full py-2 mt-3 rounded-md">
                          Pay ₹27,078
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedMethod === "gift" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Gift Card</h2>
                <input
                  type="text"
                  placeholder="Enter Gift Card Number"
                  className="border p-2 w-full rounded-md mb-3"
                />
                <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
                  Redeem
                </button>
              </div>
            )}

            {selectedMethod === "cod" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Cash on Delivery</h2>
                <p className="text-gray-600">
                  Cash on Delivery is currently unavailable for this order.
                </p>
              </div>
            )}
          </div>

          <div className="border rounded-xl bg-white shadow-sm p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
              <p className="text-gray-600">Item Total: ₹26,500</p>
              <p className="text-gray-600">Delivery Fee: ₹578</p>
              <hr className="my-2" />
              <h3 className="text-lg font-bold">Total: ₹27,078</h3>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentLayout;
