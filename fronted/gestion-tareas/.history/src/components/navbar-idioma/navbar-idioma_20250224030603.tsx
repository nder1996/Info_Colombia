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
<div style={{
   display: 'flex',
   justifyContent: 'center',
   backgroundColor: '#f8f9fa',
   padding: '20px'
 }}>
   <div style={{
     display: 'flex', 
     alignItems: 'center',
     gap: '10px'
   }}>
     <span style={{
       fontSize: '14px',
       color: '#000'
     }}>Selecciona tu idioma</span>
     <Dropdown
       value={language}
       options={options}
       onChange={(e) => changeLanguage(e.value)}
       style={{
         minWidth: '120px',
         borderRadius: '4px',
         border: '1px solid #dee2e6',
         padding: '6px 12px'
       }}
     />
   </div>
 </div>
  );
};

export default NavbarIdioma;