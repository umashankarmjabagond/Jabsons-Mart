import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

/** ✅ Product type */
interface Product {
  id: string;
  name: string;
}

/** ✅ Product payload (what you store/update) */
interface ProductPayload {
  name: string;
  productId?: string;
  [key: string]: any;
}

/** ✅ Props type */
interface SearchInputProps {
  p: ProductPayload;
  i: number;
  updateProduct: (index: number, product: ProductPayload) => void;
  fetchProducts: (query: string, index: number) => void;
  searchResults: Record<number, Product[]>;
  loadingIndex: number | null;
}

const SearchInput: React.FC<SearchInputProps> = ({
  p,
  i,
  updateProduct,
  fetchProducts,
  searchResults,
  loadingIndex,
}) => {
  const [input, setInput] = useState<string>(p.name || "");
  const debounced = useDebounce(input, 400);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  /** ✅ Fetch products when debounced input changes */
  useEffect(() => {
    if (debounced && debounced.length >= 2) {
      fetchProducts(debounced, i);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [debounced, fetchProducts, i]);

  /** ✅ Handle selection */
  const handleSelect = (item: Product) => {
    updateProduct(i, {
      ...p,
      name: item.name,
      productId: item.id,
    });

    setInput(item.name);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <input
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;

          setInput(value);

          updateProduct(i, {
            ...p,
            name: value,
            productId: "", // reset if typing
          });
        }}
        onFocus={() => input && setShowDropdown(true)}
        className="border p-2 rounded w-full"
        placeholder="Search Product..."
      />

      {showDropdown && (
        <div className="absolute z-50 bg-white border w-full mt-1 rounded shadow max-h-48 overflow-y-auto">
          {loadingIndex === i ? (
            <div className="p-2 text-sm text-gray-500">Loading...</div>
          ) : searchResults[i]?.length ? (
            searchResults[i].map((item: Product) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {item.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-sm text-gray-400">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
