import { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';


interface ToastService {
    mostrarExito: (titulo: string, detalle?: string) => void;
    mostrarError: (titulo: string, detalle?: string) => void;
    mostrarInfo: (titulo: string, detalle?: string) => void;
    mostrarAdvertencia: (titulo: string, detalle?: string) => void;
  }