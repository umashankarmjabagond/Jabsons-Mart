import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import productText from "@/locales/en.json";
import Pointer from "@/assets/images/Pointer.webp";

import { Button } from "@/components/common/ui/Button";

// ❌ REMOVE REDUX CART
// import { addToCart } from "@/redux/cartSlice";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedItems, resetCheckout } from "@/redux/checkoutSlice";
import { CardProduct } from "@/types/cartType";
import { RootState } from "@/redux/store";

import SimilarProducts from "./SimilarProducts";
import { ROUTES } from "@/constants/routeConstants";
import type { Product } from "@/types/productTypes";
import { fetchProductDetailsApi } from "@/services/product.service";

// ✅ IMPORT NEW SERVICE
import { addToCart as addToCartApi } from "@/services/cart.service";

const ProductListView: React.FC = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllOffers, setShowAllOffers] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sliderRef = useRef<Slider>(null);

  // ❌ OPTIONAL: Redux cart not needed anymore
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const allProducts: Product[] = useSelector(
    (state: RootState) => state.products.allProducts,
  );

  // ✅ FETCH PRODUCT DETAILS
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setProduct(null);

        const data = await fetchProductDetailsApi(id);

        setProduct({
          ...data,
          itemName: data.name,
        });
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 animate-pulse">
        <div className="h-64 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 w-1/2 mb-2"></div>
        <div className="h-6 bg-gray-200 w-1/3"></div>
      </div>
    );
  }

  if (!product)
    return (
      <div className="p-6">{productText.PRODUCT_LIST_VIEW.NO_PRODUCT}</div>
    );

  // IMAGE HANDLING
  const images =
    product.images && product.images.length > 0
      ? product.images.map((img) => img.imageUrl)
      : product.imageUrl
        ? [product.imageUrl]
        : [];

  // SIMILAR PRODUCTS
  const similarProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );

  const TEXT = productText.PRODUCT_LIST_VIEW;

  const visibleOffers = showAllOffers ? TEXT.OFFERS : TEXT.OFFERS.slice(0, 3);

  // ❌ OLD REDUX CHECK
  const isInCart = cartItems.some(
    (item) => item.id === product.id && item.sellerName === product.sellerName,
  );

  const handleAddToCart = async () => {
    try {
      await addToCartApi({
        productId: product.id,
        quantity: 1,
      });

      window.dispatchEvent(new Event("cartUpdated"));

      navigate("/addtocart");
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  const handleBuyNow = () => {
    const buyNowItem: CardProduct = {
      id: product.id,
      itemName: product.itemName,
      price: Number(product.price),
      imageUrl: images[0] ?? "",
      sellerName: product.sellerName ?? "Unknown Seller",
      location: product.location ?? "",
      quantity: 1,
    };

    dispatch(resetCheckout());
    dispatch(setSelectedItems([buyNowItem]));

    navigate(ROUTES.CHECKOUT, {
      state: {
        fromDirectBuy: true,
        selectedItems: [buyNowItem],
      },
    });
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    pauseOnHover: true,
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100 min-h-screen">
      {/* TOP BAR */}
      <div className="sticky top-[82px] border-b border-gray-200 pt-2">
        <div className="flex items-center justify-between max-w-[1200px] mx-auto">
          <button
            onClick={() => navigate(ROUTES.SEARCH_PAGE)}
            className="text-green-700 text-sm font-medium hover:underline"
          >
            ← Back to Products
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col lg:flex-row bg-white shadow-md p-6 gap-6 text-left">
          {/* IMAGE SECTION */}
          <div className="lg:w-2/4 flex flex-col">
            <div className="border relative flex justify-center items-center w-full min-h-[320px]">
              {images.length > 0 ? (
                <div className="w-full">
                  <Slider ref={sliderRef} {...sliderSettings}>
                    {images.map((img, idx) => (
                      <div key={idx}>
                        <div className="flex justify-center items-center w-full h-[300px]">
                          <img
                            src={img}
                            className="max-w-[350px] max-h-[100%] object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-gray-400">
                  No Image Available
                </div>
              )}

              {images.length > 0 && (
                <>
                  <button
                    onClick={() => sliderRef.current?.slickPrev()}
                    className="absolute left-2 top-1/2 bg-gray-100 p-2 rounded-full"
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    onClick={() => sliderRef.current?.slickNext()}
                    className="absolute right-2 top-1/2 bg-gray-100 p-2 rounded-full"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}

              <div
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full cursor-pointer shadow"
              >
                <Heart
                  color={isFavorite ? "red" : "gray"}
                  fill={isFavorite ? "red" : "none"}
                />
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <Button
                onClick={handleAddToCart}
                variant="addToCart"
                disabled={isInCart} // optional
              >
                {isInCart ? "Added to Cart" : TEXT.ADD_TO_CART}
              </Button>

              <Button onClick={handleBuyNow} variant="buyNow">
                {TEXT.BUY_NOW}
              </Button>
            </div>
          </div>

          {/* INFO */}
          <div className="lg:w-3/4">
            <h1 className="text-2xl font-bold">{product.itemName}</h1>
            <p className="mt-2 text-lg font-bold">₹{product.price}</p>

            <div className="mt-4">
              <h2>{TEXT.AVAILABLE_OFFERS}</h2>

              {visibleOffers.map((offer, idx) => (
                <div key={idx} className="flex gap-2">
                  <img src={Pointer} className="w-4 h-4" />
                  <span>{offer}</span>
                </div>
              ))}

              <button
                onClick={() => setShowAllOffers(!showAllOffers)}
                className="text-blue-600"
              >
                {showAllOffers ? TEXT.SHOW_LESS : "Show More"}
              </button>
            </div>
          </div>
        </div>

        <SimilarProducts
          products={similarProducts}
          currentProductName={product.itemName}
        />
      </div>

      <button
        onClick={handleScrollToTop}
        className="fixed bottom-8 right-8 bg-green-600 text-white px-4 py-2 rounded-full"
      >
        ↑ Top
      </button>
    </div>
  );
};

export default ProductListView;
