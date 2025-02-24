import { useLanguage } from "src/context/LanguageContext";
import { Language } from "src/i18n/types";

const LanguageSelector = () => {
    const { language, changeLanguage } = useLanguage();
    
    return (
      <select value={language} onChange={(e) => changeLanguage(e.target.value as Language)}>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    );
  };