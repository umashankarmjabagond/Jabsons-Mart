import Modal from "@/components/common/modal/Modal";
import { Button } from "@/components/common/ui/Button";
import { sendEnquiry } from "@/services/product.service";
import { getRecommendations } from "@/services/profile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Recommendations = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ message?: string }>({});
  const [loadingEnquiry, setLoadingEnquiry] = useState(false);

  useEffect(() => {
    getRecommendations()
      .then((res) => setData(res || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  const validate = () => {
    const newErrors: any = {};

    if (!message.trim()) {
      newErrors.message = "Message is required";
    } else if (message.length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendEnquiry = async () => {
    if (!validate()) return;
    if (!selectedProductId) return;

    try {
      setLoadingEnquiry(true);

      await sendEnquiry(selectedProductId, message);

      alert("Enquiry sent successfully");

      setIsModalOpen(false);
      setMessage("");
    } catch (err) {
      alert("Failed to send enquiry");
    } finally {
      setLoadingEnquiry(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 px-3">
      <h2 className="text-xl font-bold mb-4 text-black text-start">
        Recommended for You
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-10 text-gray-500">
          Loading recommendations...
        </div>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 bg-white rounded-2xl p-4"
          style={{ gridAutoRows: "1fr" }}
        >
          {data.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-10 text-black">
              <p className="text-lg font-semibold ">
                No recommendations available
              </p>
              <p className="text-sm">
                Please check back later or explore products
              </p>

              <button
                onClick={() => navigate("/products")}
                className="mt-4 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-sm rounded-md"
              >
                Explore Products
              </button>
            </div>
          ) : (
            data.map((product: any) => {
              const ratingNumber = product.rating ? Number(product.rating) : 0;

              return (
                <div
                  key={product.id}
                  onClick={() =>
                    navigate(`/product/${product.id}`, {
                      state: { supplier: product },
                    })
                  }
                  className="
                    bg-white rounded-xl shadow hover:shadow-md 
                    transition-all border border-gray-200 
                    flex flex-col h-full p-2 cursor-pointer
                  "
                >
                  <div className="relative h-32 md:h-36 w-full bg-gray-100 rounded-lg overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col mt-2">
                    <h3
                      className="text-sm md:text-base font-semibold text-gray-900 leading-tight h-10 overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.name || "Unnamed Product"}
                    </h3>

                    <div className="flex items-center justify-between mt-1">
                      <p className="text-blue-600 font-bold text-sm">
                        ₹{product.price || 0}
                      </p>

                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        📍 {product.location || "No Location"}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        setSelectedProductId(product.id);
                        setIsModalOpen(true);
                        setMessage(
                          "I am interested in this product. Please share details.",
                        );
                      }}
                      className="w-full bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold py-1 rounded-md mt-2"
                    >
                      Contact Supplier
                    </button>
                  </div>

                  <div className="border-t mt-2 pt-2 flex justify-between items-start gap-2">
                    <p className="text-sm font-semibold truncate">
                      {product.seller_name || "Unknown Seller"}
                    </p>

                    <div className="text-green-700 text-xs">📞 View Number</div>
                  </div>

                  <div className="flex justify-between items-center mt-1">
                    <div>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < ratingNumber
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-semibold">
                      {ratingNumber.toFixed(1)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Send Enquiry"
        showClose
        footer={
          <>
            <Button
              onClick={() => setIsModalOpen(false)}
              className="w-full"
              variant="secondary"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSendEnquiry}
              className="w-full"
              disabled={loadingEnquiry}
            >
              {loadingEnquiry ? "Sending..." : "Send Enquiry"}
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-2 min-h-[150px]">
          <label className="text-sm font-semibold">Message</label>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`border rounded-md p-2 ${
              errors.message ? "border-red-500" : ""
            }`}
            placeholder="Type your requirement..."
          />

          <p className="text-red-500 text-sm min-h-[1.25rem]">
            {errors.message || ""}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Recommendations;
