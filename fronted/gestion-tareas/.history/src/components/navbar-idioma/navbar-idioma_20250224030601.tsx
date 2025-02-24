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
    <div className="language-container">
      <div className="language-wrapper">
        <span className="language-label">Selecciona tu idioma</span>
        <Dropdown
          value={language}
          options={options}
          onChange={(e) => changeLanguage(e.value)}
          className="dropdown"
        />
      </div>
    </div>
  );
};

export default NavbarIdioma;