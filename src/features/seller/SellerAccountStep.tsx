import React, { useState } from "react";

interface Props {
  onNext: () => void;
}

const SellerAccountStep: React.FC<Props> = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // ✅ Save user + registration flag
    localStorage.setItem("user", JSON.stringify({ email }));
    localStorage.setItem("isRegistered", "true");

    onNext(); // move to step 2
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">Create Account</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-4 py-2 rounded w-64"
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border px-4 py-2 rounded w-64"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Continue →
      </button>
    </div>
  );
};

export default SellerAccountStep;
