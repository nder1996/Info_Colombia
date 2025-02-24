import { Dropdown } from 'primereact/dropdown';
import { useLanguage } from "src/context/LanguageContext";
import { Language } from "src/i18n/types";

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  const options = [
    { label: 'Español', value: 'es' as Language },
    { label: 'English', value: 'en' as Language }
  ];

  return (
    <Dropdown
      value={language}
      options={options} 
      onChange={(e) => changeLanguage(e.value)}
      optionLabel="label"
      className="w-14rem"
    />
  );
};

export default LanguageSelector;