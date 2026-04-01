import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

const SearchInput = ({
  p,
  i,
  updateProduct,
  fetchProducts,
  searchResults,
  loadingIndex,
}) => {
  const [input, setInput] = useState(p.name || "");
  const debounced = useDebounce(input, 400);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (debounced && debounced.length >= 2) {
      fetchProducts(debounced, i);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [debounced]);

  const handleSelect = (item) => {
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
        onChange={(e) => {
          setInput(e.target.value);
          updateProduct(i, {
            ...p,
            name: e.target.value,
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
            searchResults[i].map((item) => (
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
