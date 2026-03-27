import React, { useEffect, useState } from "react";
import { CheckCircle, ImagePlus, Building2 } from "lucide-react";

interface Product {
  name: string;
  image: string | null;
}

interface Props {
  onPrevious: () => void; // ✅ IMPORTANT
}

const SellerProductDetails: React.FC<Props> = ({ onPrevious }) => {
  const [products, setProducts] = useState<Product[]>([
    { name: "", image: null },
    { name: "", image: null },
    { name: "", image: null },
  ]);

  // ✅ Load saved products
  useEffect(() => {
    const saved = localStorage.getItem("sellerProducts");
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  const handleNameChange = (index: number, value: string) => {
    const updated = [...products];
    updated[index].name = value;
    setProducts(updated);
  };

  const handleImageChange = (index: number, file: File | null) => {
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const updated = [...products];
    updated[index].image = imageUrl;
    setProducts(updated);
  };

  const handleContinue = () => {
    // ✅ Save data
    localStorage.setItem("sellerProducts", JSON.stringify(products));

    alert("✅ Products added successfully!");
  };

  return (
    <section className="flex flex-col md:flex-row items-start justify-center px-4 py-6 gap-6">
      {/* LEFT SECTION */}
      <div className="bg-white shadow-md rounded-xl p-6 sm:p-8 w-full md:w-2/3 max-w-3xl">
        {/* SUCCESS */}
        <div className="flex items-center gap-2 text-green-600 mb-3">
          <CheckCircle className="w-5 h-5" />
          <p className="font-medium text-sm">
            Business details added successfully
          </p>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-blue-800 mb-1">
          Product Details
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Add 3 products/services you wish to sell
        </p>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col gap-2 items-center">
              {/* NAME */}
              <input
                type="text"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                className="border rounded-md px-3 py-2 w-full"
              />

              {/* IMAGE */}
              <label className="w-full h-40 border rounded-md flex items-center justify-center cursor-pointer bg-gray-50">
                {product.image ? (
                  <img
                    src={product.image}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <ImagePlus />
                    Add Photo
                  </div>
                )}
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    handleImageChange(index, e.target.files?.[0] || null)
                  }
                />
              </label>
            </div>
          ))}
        </div>

        {/* 🔥 BUTTONS */}
        <div className="flex justify-between mt-8">
          {/* PREVIOUS */}
          <button
            onClick={onPrevious}
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
          >
            ← Previous
          </button>

          {/* CONTINUE */}
          <button
            onClick={handleContinue}
            className="bg-teal-600 text-white px-6 py-2 rounded-md"
          >
            Finish →
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/3 max-w-sm">
        <div className="flex items-center gap-2 mb-4 border-b pb-2">
          <Building2 className="text-teal-600" size={20} />
          <h3 className="text-lg font-semibold">Profile</h3>
        </div>

        <p>
          <b>Name:</b> Guru
        </p>
        <p>
          <b>Company:</b> tekpyramid
        </p>
        <p>
          <b>Email:</b> guruprasath.vs14@gmail.com
        </p>
      </div>
    </section>
  );
};

export default SellerProductDetails;
