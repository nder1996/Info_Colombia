import { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';


interface ToastService {
    mostrarExito: (titulo: string, detalle?: string) => void;
    mostrarError: (titulo: string, detalle?: string) => void;
    mostrarInfo: (titulo: string, detalle?: string) => void;
    mostrarAdvertencia: (titulo: string, detalle?: string) => void;
}

const ToastContext = createContext<ToastService>({} as ToastService);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const toast = useRef<Toast>(null);

    const mostrarExito = (titulo: string, detalle?: string) => {
        toast.current?.show({
            severity: 'success',
            summary: titulo,
            detail: detalle,
            life: 3000
        });
    };

    const mostrarError = (titulo: string, detalle?: string) => {
        toast.current?.show({
            severity: 'error',
            summary: titulo,
            detail: detalle,
            life: 5000
        });
    };

    const mostrarInfo = (titulo: string, detalle?: string) => {
        toast.current?.show({
            severity: 'info',
            summary: titulo,
            detail: detalle,
            life: 3000
        });
    };

    const mostrarAdvertencia = (titulo: string, detalle?: string) => {
        toast.current?.show({
            severity: 'warn',
            summary: titulo,
            detail: detalle,
            life: 4000
        });
    };

    return (
        <ToastContext.Provider value={{ mostrarExito, mostrarError, mostrarInfo, mostrarAdvertencia }}>
            <Toast ref={toast} position="top-right" />
            {children}
        </ToastContext.Provider>
    );
};