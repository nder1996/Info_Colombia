import { Divider } from '@mui/material';
import { Avatar } from 'primereact/avatar';
import { Dropdown } from 'primereact/dropdown';
import { Menu } from 'primereact/menu';
import { useRef } from 'react';
import { useLanguage } from "src/context/LanguageContext";
import { Language } from "src/i18n/types";
import { AuthService } from 'src/services/AuthService';

const NavbarIdioma = () => {
  const { language, changeLanguage } = useLanguage();
  const languageOptions = [
    { label: 'Español', value: 'es' as Language },
    { label: 'English', value: 'en' as Language }
  ];
  
  const menuRef = useRef<Menu>(null);
  
  // Get user information from your auth service
  const userInfo = AuthService.getInfoSession();
  const userName = userInfo?.username || 'Invitado';

  const userMenuItems = [
    {
      separator: true
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => {
        AuthService.logout();
        window.location.href = '/login';
      }
    }
  ];

  const toggleUserMenu = (event: React.MouseEvent) => {
    menuRef.current?.toggle(event);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      padding: '10px 20px',
      height: '60px'
    }}>
      <div style={{ 
        fontWeight: 'bold', 
        fontSize: '1.2rem',
        color: '#333'
      }}>
        Gestión de Tareas
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <i className="pi pi-globe" style={{ fontSize: '1rem' }}></i>
          <Dropdown
            value={language}
            options={languageOptions}
            onChange={(e) => changeLanguage(e.value)}
            style={{
              minWidth: '120px'
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }} onClick={toggleUserMenu}>
          <Avatar 
            label={userName.substring(0, 1).toUpperCase()} 
            shape="circle" 
            style={{ backgroundColor: '#2196F3', color: '#ffffff' }} 
          />{
            userInfo.isAuthenticated? (
          }
          <span style={{ fontSize: '14px' }}>{userName}</span>
          <i className="pi pi-angle-down"></i>
          <Menu 
            model={userMenuItems} 
            popup 
            ref={menuRef} 
            style={{ width: '200px' }} 
          />
        </div>
      </div>

    </div>
   
  );
};


export default NavbarIdioma;