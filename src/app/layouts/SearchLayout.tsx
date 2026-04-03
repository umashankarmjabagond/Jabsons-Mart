import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchProducts } from "@/redux/productSlice";
import { RootState, AppDispatch } from "@/redux/store";

import { OBSERVER_OPTIONS, CLASSNAMES } from "@/constants/searchpagelayout";
import LocationSearch from "@/features/productList/LocationSearch";
import FilterSlideBar from "@/features/productList/FilterSlideBar";
import ProductList from "@/features/productList/ProductList";
import RequirementForm from "@/features/productList/RequirementForm";

const SearchLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const { filteredProducts, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  console.log("filteredProducts from store in search layout", filteredProducts);

  const [showForm, setShowForm] = useState(false);
  const productListEndRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  const searchParams = new URLSearchParams(location.search);
  const productParam = searchParams.get("product");
  const categoryParam = searchParams.get("category");

  /** Fetch products from DB based on URL */
  useEffect(() => {
    dispatch(
      fetchProducts({
        product: productParam,
        category: categoryParam,
      }),
    );
  }, [dispatch, productParam, categoryParam]);

  /** Scroll reset */
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [filteredProducts]);

  /** Observer for requirement form */
  useEffect(() => {
    if (!mainRef.current || !productListEndRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowForm(entry.isIntersecting),
      { root: mainRef.current, threshold: OBSERVER_OPTIONS.THRESHOLD },
    );

    observer.observe(productListEndRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col h-screen min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100  overflow-hidden">
      <Navbar />

      <div className="flex-1 flex flex-col border border-gray-200 overflow-hidden">
        {/* Location search */}
        <div className={CLASSNAMES.LOCATION_SEARCH_CONTAINER}>
          <LocationSearch />
        </div>

        {/* Main content area */}
        <div className="flex-1 min-h-0 flex md:flex-row overflow-hidden gap-4 p-2 sm:p-4">
          {/* Filters */}
          <aside className={`hidden md:block ${CLASSNAMES.FILTER_SIDEBAR}`}>
            <FilterSlideBar loading={loading} error={error} />
          </aside>

          {/* Product list */}
          <main
            ref={mainRef}
            className={`${CLASSNAMES.MAIN_CONTAINER} flex flex-col`}
          >
            <div className="flex-1">
              <ProductList
                products={filteredProducts}
                loading={loading}
                error={error}
              />

              <div ref={productListEndRef} className="h-4" />

              {showForm && (
                <div className="p-2 sm:p-4">
                  <RequirementForm />
                </div>
              )}
            </div>

            {/* Footer stays at bottom */}
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchLayout;
