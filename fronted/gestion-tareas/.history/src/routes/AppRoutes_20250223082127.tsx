import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import useAuthStore from "../store/auth/useAuthStore";
import GestionTareas from "src/components/gestion-tareas/GestionTareas";
import InicioSession from "src/components/InicioSession/InicioSession";

const AppRoutes: React.FC = () => {
  const auth = useAuthStore((state) => state.Auth);

  return (
    <Routes>
      <Route path="/login" element={<InicioSession />} />
      <Route path="/Registro" element={<InicioSession />} />
      
      {/* Agrupar rutas protegidas dentro de ProtectedRoute */}
      <Route element={<ProtectedRoute />}>
        <Route path="/GestionTareas" element={<GestionTareas />} />
      </Route>

      {/* Redirigir a login si no hay ruta válida */}
      
       <Route path="*" element={<Navigate to={auth.isAuthenticated ? "/GestionTareas" : "/login"} replace />} />
    </Routes>
  );
};

export default AppRoutes;
