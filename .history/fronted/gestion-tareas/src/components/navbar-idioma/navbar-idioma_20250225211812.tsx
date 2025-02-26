import { useEffect, useRef, useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { Dropdown } from 'primereact/dropdown';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from 'src/context/LanguageContext';
import { Language } from 'src/i18n/types';
import { AuthData, AuthService } from 'src/services/AuthService';
import useAuthStore from 'src/store/auth/useAuthStore';


const NavbarIdioma = () => {
  const { language, changeLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<Menu>(null);
  const auth = useAuthStore((state) => state.Auth);



  const languageOptions = [
    { label: 'Español', value: 'es' as Language },
    { label: 'English', value: 'en' as Language },
  ];

  const userMenuItems = [
    { separator: true },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => {
        AuthService.logout();
        window.location.href = '/login';
      },
    },
  ];

  const toggleUserMenu = (event: React.MouseEvent) => {
    if (menuRef.current) {
      menuRef.current.toggle(event);
    }
  };


  return (
    <div
      style={{
        width: '100%',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#fff',
        display: 'flex',
        height: '48px',
        alignItems: 'center',
        padding: '2rem',
        boxSizing: 'border-box',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/5488/5488065.png"
          alt="Task Manager Icon"
          style={{ height: '24px', marginRight: '10px' }}
        />
        <span
          style={{
            fontSize: '1.4rem',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
        </span>
      </div>

      {auth.isAuthenticated && auth.rolAdmin && (
        <div style={{ marginRight: '20px' }}>
          {location.pathname.includes('GestionUsuarios') ? (
            <Button
              label="Gestión de Tareas"
              icon="pi pi-list"
              className="p-button-outlined p-button-info"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/GestionTareas');
              }}
            />
          ) : (
            <Button
              label="Gestión de Usuarios"
              icon="pi pi-users"
              className="p-button-outlined p-button-info"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/GestionUsuarios');
              }}
            />
          )}
        </div>
      )}

      {/* Muestra la información del usuario si está autenticado */}
      {auth.isAuthenticated && (
        <div
          onClick={toggleUserMenu}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            marginLeft: '25px',
          }}
        >
          <Avatar
            label={auth?.username ? auth.username.charAt(0).toUpperCase() : ''}
            shape="circle"
            style={{ backgroundColor: '#2196F3', color: '#ffffff' }}
          />
          <span style={{ fontSize: '14px' }}>{auth.username}</span>
          <i className="pi pi-angle-down"></i>
          <Menu model={userMenuItems} popup ref={menuRef} appendTo={document.body} />
        </div>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginRight: '25px',
          marginLeft: '25px',
        }}
      >
        <Dropdown
          value={language}
          options={languageOptions}
          onChange={(e) => changeLanguage(e.value)}
          style={{ minWidth: '120px' }}
        />
      </div>
    </div>
  );
};

export default NavbarIdioma;
