import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useLanguage } from "src/context/LanguageContext";
import { Language } from "src/i18n/types";

const LanguageSelector = () => {
 const { language, changeLanguage } = useLanguage();

 const options = [
   { label: 'Español', value: 'es' },
   { label: 'English', value: 'en' }
 ];

 const handleLanguageChange = (e: DropdownChangeEvent) => {
   changeLanguage(e.value as Language);
 };

 return (
   <Dropdown
     value={language}
     options={options} 
     onChange={handleLanguageChange}
     optionLabel="label"
     className="w-14rem"
   />
 );
};

export default LanguageSelector;