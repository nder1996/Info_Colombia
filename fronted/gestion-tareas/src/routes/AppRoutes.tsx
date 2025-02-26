import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import useAuthStore from "../store/auth/useAuthStore";
import GestionTareas from "src/components/gestion-tareas/GestionTareas";
import InicioSession from "src/components/InicioSession/InicioSession";
import Registrarse from "src/components/registrarse/Registrarse";
import GestionUsuarios from "src/components/gestion-usuarios/GestionUsuarios";

const AppRoutes: React.FC = () => {
  const auth = useAuthStore((state) => state.Auth);


  return (
    <Routes>
      <Route
        path="/login"
        element={!auth.isAuthenticated ? <InicioSession /> : <Navigate to="/GestionTareas" />}
      />
      <Route
        path="/Registro"
        element={!auth.isAuthenticated ? <Registrarse /> : <Navigate to="/GestionTareas" />}
      />

      <Route element={<ProtectedRoute />}>
        <Route path="/GestionTareas" element={<GestionTareas />} />
        <Route path="/GestionUsuarios" element={<GestionUsuarios />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
};

export default AppRoutes;
