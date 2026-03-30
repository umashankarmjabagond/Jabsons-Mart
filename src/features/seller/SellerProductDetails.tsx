import React, { useEffect, useState } from "react";
import { ImagePlus, X, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/store/slices/ProductSlice";
import { useNavigate } from "react-router-dom";

interface ImageType {
  url: string;
  isPrimary: boolean;
}

interface Product {
  name: string;
  mainCategoryId: string;
  subCategoryId: string;
  categoryId: string;
  images: ImageType[];
}

interface Category {
  id: string;
  name: string;
  parent_id?: string | null;
}

interface Props {
  onPrevious: () => void;
}

const SellerProductDetails: React.FC<Props> = ({ onPrevious }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedProducts = useSelector((state: any) => state.products.products);

  const [products, setProductsState] = useState<Product[]>([
    {
      name: "",
      mainCategoryId: "",
      subCategoryId: "",
      categoryId: "",
      images: [],
    },
    {
      name: "",
      mainCategoryId: "",
      subCategoryId: "",
      categoryId: "",
      images: [],
    },
    {
      name: "",
      mainCategoryId: "",
      subCategoryId: "",
      categoryId: "",
      images: [],
    },
  ]);

  const [errors, setErrors] = useState<any>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (savedProducts && savedProducts.length > 0) {
      setProductsState(savedProducts);
    } else {
      const local = localStorage.getItem("sellerProducts");
      if (local) {
        setProductsState(JSON.parse(local));
      }
    }
  }, [savedProducts]);

  useEffect(() => {
    dispatch(setProducts(products));
    localStorage.setItem("sellerProducts", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    setCategories([
      { id: "1", name: "Apparel", parent_id: null },
      { id: "2", name: "Accessories", parent_id: "1" },
      { id: "3", name: "Gloves & Mittens", parent_id: "2" },
    ]);
  }, []);

  const getMain = () => categories.filter((c) => !c.parent_id);
  const getSub = (id: string) => categories.filter((c) => c.parent_id === id);
  const getLeaf = (id: string) => categories.filter((c) => c.parent_id === id);

  const updateProduct = (i: number, updated: Product) => {
    const copy = [...products];
    copy[i] = updated;
    setProductsState(copy);
  };

  const handleImageUpload = (i: number, files: FileList | null) => {
    if (!files) return;

    const imgs = Array.from(files).map((file, idx) => ({
      url: URL.createObjectURL(file),
      isPrimary: idx === 0,
    }));

    const copy = [...products];
    copy[i].images = [...copy[i].images, ...imgs];
    setProductsState(copy);
  };

  const handleDrop = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    handleImageUpload(i, e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const removeImage = (p: number, i: number) => {
    const copy = [...products];
    copy[p].images.splice(i, 1);
    setProductsState(copy);
  };

  const setPrimary = (p: number, i: number) => {
    const copy = [...products];
    copy[p].images = copy[p].images.map((img, idx) => ({
      ...img,
      isPrimary: idx === i,
    }));
    setProductsState(copy);
  };

  /* VALIDATION */
  const validateForm = (forceValidate = false) => {
    const formatted: any = {};
    let hasValid = false;

    products.forEach((p, i) => {
      const isTouched =
        p.name ||
        p.mainCategoryId ||
        p.subCategoryId ||
        p.categoryId ||
        p.images.length;

      // 🔥 FIX HERE
      if (!isTouched && !forceValidate) return;

      const err: any = {};

      if (!p.name.trim()) err.name = "Product name is required";
      if (!p.mainCategoryId) err.mainCategoryId = "Select main category";
      if (!p.subCategoryId) err.subCategoryId = "Select sub category";
      if (!p.categoryId) err.categoryId = "Select final category";
      if (!p.images.length) err.images = "At least one image required";

      if (Object.keys(err).length === 0) hasValid = true;
      else formatted[i] = err;
    });

    setErrors(formatted);
    return hasValid;
  };

  const handleContinue = () => {
    setIsSubmitted(true);

    const isValid = validateForm(true);

    if (!isValid) return;

    const validProducts = products.filter(
      (p) =>
        p.name &&
        p.mainCategoryId &&
        p.subCategoryId &&
        p.categoryId &&
        p.images.length > 0,
    );

    console.log("FINAL 👉", validProducts);

    // ✅ SUCCESS ALERT
    alert("✅ Product added successfully!");

    // ✅ CLEAR FORM
    const emptyProducts = [
      {
        name: "",
        mainCategoryId: "",
        subCategoryId: "",
        categoryId: "",
        images: [],
      },
      {
        name: "",
        mainCategoryId: "",
        subCategoryId: "",
        categoryId: "",
        images: [],
      },
      {
        name: "",
        mainCategoryId: "",
        subCategoryId: "",
        categoryId: "",
        images: [],
      },
    ];

    setProductsState(emptyProducts);
    dispatch(setProducts(emptyProducts));
    localStorage.removeItem("sellerProducts");

    // ✅ OPTIONAL REDIRECT (choose one)
    // window.location.href = "/market";
    // OR if using react-router:
    navigate("/market");
  };

  return (
    <section className="flex flex-col md:flex-row gap-6 p-6">
      <div className="bg-white p-6 rounded-xl shadow w-full md:w-2/3">
        <div className="grid sm:grid-cols-3 gap-5">
          {products.map((p, i) => (
            <div key={i} className="space-y-2">
              <input
                value={p.name}
                onChange={(e) =>
                  updateProduct(i, { ...p, name: e.target.value })
                }
                className="border p-2 rounded w-full"
                placeholder="Product Name"
              />
              <p className="text-red-500 text-xs min-h-[16px]">
                {errors[i]?.name || ""}
              </p>

              <select
                value={p.mainCategoryId}
                onChange={(e) =>
                  updateProduct(i, {
                    ...p,
                    mainCategoryId: e.target.value,
                    subCategoryId: "",
                    categoryId: "",
                  })
                }
                className="border p-2 rounded w-full"
              >
                <option value="">Main Category</option>
                {getMain().map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-xs min-h-[16px]">
                {errors[i]?.mainCategoryId || ""}
              </p>

              <select
                disabled={!p.mainCategoryId}
                value={p.subCategoryId}
                onChange={(e) =>
                  updateProduct(i, {
                    ...p,
                    subCategoryId: e.target.value,
                    categoryId: "",
                  })
                }
                className="border p-2 rounded w-full"
              >
                <option value="">Sub Category</option>
                {getSub(p.mainCategoryId).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-xs min-h-[16px]">
                {errors[i]?.subCategoryId || ""}
              </p>

              <select
                disabled={!p.subCategoryId}
                value={p.categoryId}
                onChange={(e) =>
                  updateProduct(i, { ...p, categoryId: e.target.value })
                }
                className="border p-2 rounded w-full"
              >
                <option value="">Final Category</option>
                {getLeaf(p.subCategoryId).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-xs min-h-[16px]">
                {errors[i]?.categoryId || ""}
              </p>

              <label
                onDrop={(e) => handleDrop(e, i)}
                onDragOver={handleDragOver}
                className="relative w-full h-28 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition group"
              >
                {/* ICON */}
                <ImagePlus
                  size={28}
                  className="text-gray-400 group-hover:text-teal-600 transition"
                />

                {/* TEXT */}
                <p className="text-xs text-gray-500 mt-1 text-center">
                  <span className="text-teal-600 font-medium">
                    Click to upload
                  </span>{" "}
                  or drag & drop
                </p>

                {/* SUB TEXT */}
                <p className="text-[10px] text-gray-400">PNG, JPG (Max 5MB)</p>

                {/* 🔥 IMPORTANT INPUT FIX */}
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleImageUpload(i, e.target.files)}
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
      <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/3">
        <h3 className="font-semibold mb-2">Profile</h3>
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
