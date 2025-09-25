import React from "react";
import { useTranslation } from "react-i18next";
import { SelectInput } from "./common/ui/SelectInput";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { value: "en", label: "English" },
    { value: "hn", label: "Hindi" },
    { value: "kn", label: "Kannada" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="flex items-center space-x-3">
      <SelectInput
        name="language"
        value={i18n.language}
        onChange={handleChange}
        onBlur={() => {}}
        options={languages}
        className="px-2 py-1 w-40"
        requiredIndicator={false}
      />
      <span className="text-sm font-medium text-gray-700">Language</span>
    </div>
  );
};

export default LanguageSwitcher;
