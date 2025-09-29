import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SelectInput } from "./common/ui/SelectInput";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { value: "en", label: "English" },
    { value: "hn", label: "Hindi" },
    { value: "kn", label: "Kannada" },
  ];

  useEffect(() => {
    const storedLang = localStorage.getItem("i18nextLng");
    if (!storedLang) {
      i18n.changeLanguage("en");
      localStorage.setItem("i18nextLng", "en");
    }
  }, [i18n]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lng = e.target.value;
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
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
    </div>
  );
};

export default LanguageSwitcher;
