import React, { useEffect, useState } from "react";
import { ImagePlus, X, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/store/slices/ProductSlice";
import { createProduct, searchProductsAPI } from "@/services/product.service";
import SearchInput from "@/components/common/ui/SearchInput";

/* ------------------ TYPES ------------------ */

interface ImageType {
  url: string;
  isPrimary: boolean;
  file: File;
}

interface Product {
  name: string;
  productId: string;
  images: ImageType[];
}

interface SearchResultItem {
  id: string;
  name: string;
}

interface Props {
  onPrevious: () => void;
}

/* ------------------ MAIN COMPONENT ------------------ */

const SellerProductDetails: React.FC<Props> = ({ onPrevious }) => {
  const dispatch = useDispatch();

  const savedProducts = useSelector((state: any) => state.products.products);

  const [products, setProductsState] = useState<Product[]>([
    { name: "", productId: "", images: [] },
    { name: "", productId: "", images: [] },
    { name: "", productId: "", images: [] },
  ]);

  const [errors, setErrors] = useState<
    Record<number, { name?: string; images?: string }>
  >({});
  const [searchResults, setSearchResults] = useState<
    Record<number, SearchResultItem[]>
  >({});
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  /* ------------------ LOAD STATE ------------------ */

  useEffect(() => {
    if (savedProducts?.length) {
      setProductsState(savedProducts);
    } else {
      const local = localStorage.getItem("sellerProducts");
      if (local) {
        setProductsState(JSON.parse(local) as Product[]);
      }
    }
  }, [savedProducts]);

  useEffect(() => {
    dispatch(setProducts(products));
    localStorage.setItem("sellerProducts", JSON.stringify(products));
  }, [products, dispatch]);

  /* ------------------ UPDATE PRODUCT ------------------ */

  const updateProduct = (i: number, updated: Product) => {
    setProductsState((prev: Product[]) => {
      const copy = [...prev];
      copy[i] = updated;
      return copy;
    });
  };

  /* ------------------ API CALL ------------------ */

  const fetchProducts = async (query: string, index: number) => {
    try {
      setLoadingIndex(index);

      const data = await searchProductsAPI(query);

      setSearchResults((prev: Record<number, SearchResultItem[]>) => ({
        ...prev,
        [index]: data?.data || [],
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingIndex(null);
    }
  };

  /* ------------------ IMAGE HANDLING ------------------ */

  const handleImageUpload = (i: number, files: FileList | null) => {
    if (!files) return;

    const imgs: ImageType[] = Array.from(files).map((file, idx) => ({
      url: URL.createObjectURL(file),
      file,
      isPrimary: idx === 0,
    }));

    setProductsState((prev: Product[]) => {
      const copy = [...prev];
      copy[i] = {
        ...copy[i],
        images: [...copy[i].images, ...imgs],
      };
      return copy;
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>, i: number) => {
    e.preventDefault();
    handleImageUpload(i, e.dataTransfer.files);
  };

  const removeImage = (pIndex: number, imgIndex: number) => {
    setProductsState((prev: Product[]) => {
      const copy = [...prev];
      copy[pIndex].images = copy[pIndex].images.filter(
        (_, idx) => idx !== imgIndex,
      );
      return copy;
    });
  };

  const setPrimary = (pIndex: number, imgIndex: number) => {
    setProductsState((prev: Product[]) => {
      const copy = [...prev];
      copy[pIndex].images = copy[pIndex].images.map((img, idx) => ({
        ...img,
        isPrimary: idx === imgIndex,
      }));
      return copy;
    });
  };

  /* ------------------ VALIDATION ------------------ */

  const validateForm = (): boolean => {
    const formatted: Record<number, { name?: string; images?: string }> = {};
    let hasValid = false;

    products.forEach((p, i) => {
      const err: { name?: string; images?: string } = {};

      if (!p.productId) err.name = "Please select product";
      if (!p.images.length) err.images = "At least one image required";

      if (Object.keys(err).length === 0) hasValid = true;
      else formatted[i] = err;
    });

    setErrors(formatted);
    return hasValid;
  };

  /* ------------------ SUBMIT ------------------ */

  const handleContinue = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    try {
      const validProducts = products.filter(
        (p) => p.productId && p.images.length > 0,
      );

      for (const product of validProducts) {
        const formData = new FormData();

        formData.append("categoryId", product.productId);
        formData.append("name", product.name);

        product.images.forEach((img) => {
          if (img.file instanceof File) {
            formData.append("images", img.file);
          }
        });

        await createProduct(formData);
      }

      alert("✅ Products added successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Failed");
    }
  };

  /* ------------------ UI ------------------ */

  return (
    <section className="flex flex-col md:flex-row gap-6 p-6">
      <div className="bg-white p-6 rounded-xl shadow w-full md:w-2/3">
        <div className="grid sm:grid-cols-3 gap-5">
          {products.map((p, i) => (
            <div key={i} className="space-y-2">
              <SearchInput
                p={p}
                i={i}
                updateProduct={updateProduct}
                fetchProducts={fetchProducts}
                searchResults={searchResults}
                loadingIndex={loadingIndex}
              />

              <p className="text-red-500 text-xs min-h-[16px]">
                {errors[i]?.name || ""}
              </p>

              <label
                onDrop={(e) => handleDrop(e, i)}
                onDragOver={(e) => e.preventDefault()}
                className="relative w-full h-28 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
              >
                <ImagePlus size={28} className="text-gray-400" />

                <p className="text-xs text-gray-500 mt-1 text-center">
                  <span className="text-teal-600 font-medium">
                    Click to upload
                  </span>{" "}
                  or drag & drop
                </p>

                <input
                  type="file"
                  multiple
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleImageUpload(i, e.target.files)
                  }
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>

              <p className="text-red-500 text-xs min-h-[16px]">
                {errors[i]?.images || ""}
              </p>

              <div className="grid grid-cols-3 gap-1">
                {p.images.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={img.url}
                      className="h-16 w-full object-cover rounded"
                    />

                    <button
                      onClick={() => removeImage(i, idx)}
                      className="absolute top-1 right-1 bg-white p-1 rounded"
                    >
                      <X size={10} />
                    </button>

                    <button
                      onClick={() => setPrimary(i, idx)}
                      className="absolute bottom-1 left-1 bg-white p-1 rounded"
                    >
                      <Star
                        size={10}
                        className={
                          img.isPrimary ? "text-yellow-500" : "text-gray-400"
                        }
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={onPrevious} className="border px-4 py-2 rounded">
            ← Previous
          </button>

          <button
            onClick={handleContinue}
            className="bg-teal-600 text-white px-6 py-2 rounded"
          >
            Finish →
          </button>
        </div>
      </div>
    </section>
  );
};

export default SellerProductDetails;
