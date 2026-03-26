import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ComingSoon = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // ✅ goes to previous page
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 text-white px-4 relative">
        {/* 🔙 BACK BUTTON */}
        <button
          onClick={goBack}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-sm hover:bg-white/30 transition"
        >
          ← Back
        </button>

        {/* CONTENT */}
        <div className="text-center max-w-xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide mb-4">
            Coming Soon 🚀
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-6">
            We’re working hard to bring something amazing. Stay tuned!
          </p>

          {/* EMAIL INPUT */}
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg text-black w-full sm:w-auto min-w-[250px] focus:outline-none"
            />
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
              Notify Me
            </button>
          </div>

          {/* LOADER */}
          <div className="flex justify-center mb-6">
            <div className="w-4 h-4 bg-white rounded-full animate-bounce mx-1"></div>
            <div className="w-4 h-4 bg-white rounded-full animate-bounce mx-1 delay-150"></div>
            <div className="w-4 h-4 bg-white rounded-full animate-bounce mx-1 delay-300"></div>
          </div>

          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Trade Hub. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
