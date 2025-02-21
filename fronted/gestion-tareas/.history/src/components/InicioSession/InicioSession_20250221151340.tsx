import React, { ChangeEvent, FormEvent, useState } from 'react';
import './Ingreso.css';
import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { AuthService } from 'services/AuthService';
import { useNavigate } from 'react-router-dom';
import GestionTareas from 'components/gestion-tareas/GestionTareas';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsuarioService } from 'services/UsuarioService';


interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}
const InicioSession = () => {

  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Login:', formData);
    } else {
      setErrors(newErrors);
    }
  };


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
    <CardContent className="p-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Sign In</h2>
        <p className="text-gray-600">Enter your credentials</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Username</label>
          <div className="relative">
            <Input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className={`w-full py-2 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.username && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{errors.username}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full py-2 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{errors.password}</span>
              </div>
            )}
          </div>
        </div>

        <Button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
        >
          Sign In
        </Button>
      </form>
    </CardContent>
  </Card>
  );
};

export default InicioSession;