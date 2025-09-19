import React, { useState } from "react";

interface TextDropdownProps {
  title: string;
  options: string[];
  onSelect?: (value: string) => void;
  limit?: number;
}

const TextDropdown: React.FC<TextDropdownProps> = ({
  title,
  options,
  onSelect,
  limit = 5,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, ] = useState(false);

  const visibleOptions = showAll ? options : options.slice(0, limit);

  return (
    <div className="border-b border-gray-200 bg-white rounded-md">
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="w-full flex justify-between border border-grey-300 items-center px-4 py-2   bg-gray-100"
      >
        <span className="font-medium">{title}</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-4 py-2 space-y-2 max-h-60 overflow-y-auto">
          {visibleOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => onSelect?.(opt)}
              className="w-full text-left  hover:underline text-sm"
            >
              {opt}
            </button>
          ))}

         
        </div>
      )}
    </div>
  );
};

export default TextDropdown;

