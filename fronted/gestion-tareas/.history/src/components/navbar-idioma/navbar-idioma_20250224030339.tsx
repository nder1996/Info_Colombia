import { Dropdown } from 'primereact/dropdown';
import { useLanguage } from "src/context/LanguageContext";
import { Language } from "src/i18n/types";

const NavbarIdioma = () => {
  const { language, changeLanguage } = useLanguage();

  const options = [
    { label: 'Español', value: 'es' as Language },
    { label: 'English', value: 'en' as Language }
  ];

  return (
    <div className="language-selector">
      <label className="language-label">Selecciona tu idioma</label>
      <Dropdown
        value={language}
        options={options}
        onChange={(e) => changeLanguage(e.value)}
        optionLabel="label"
        className="w-56"
        placeholder="Seleccionar idioma"
        itemTemplate={(option) => (
          <div className="flex items-center gap-2">
            <span>{option.flag}</span>
            <span>{option.label}</span>
          </div>
        )}
      />
    </div>
  );
};

export default NavbarIdioma;