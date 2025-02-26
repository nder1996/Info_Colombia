import axios from 'axios';
import { AuthService } from './AuthService';
import { loadingStore } from './interceptorLoadingService';

const InterceptorAuth = {
  usuario: axios.create({
    baseURL: 'https://info-colombia.onrender.com/api/usuario'
  }),
  summary: axios.create({
    baseURL: 'https://info-colombia.onrender.com/api/summary/'
  }),
  tarea: axios.create({
    baseURL: 'https://info-colombia.onrender.com/api/tarea/'
  })
};




Object.values(InterceptorAuth).forEach(api => {
  api.interceptors.request.use(
    (config) => {
      /*console.log(`Request Details: 
        method: ${config.method}, 
        url: ${config.url}, 
        baseURL: ${config.baseURL}, 
        fullURL: ${config.baseURL || ''}${config.url || ''}, 
        headers: ${JSON.stringify(config.headers)}, 
        params: ${JSON.stringify(config.params)}, 
        data: ${JSON.stringify(config.data)}`
      );*/
      
      loadingStore.show();
      const token = AuthService.getToken()?.replace(/"/g, '');
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        //console.log(`Token added to request: ${token}`);
      }
      
      return config;
    },
    (error) => {
      //console.error(`Request Interceptor - Error: ${error}`);
      loadingStore.hide();
      return Promise.reject(error);
    }
  );
  
  api.interceptors.response.use(
    (response) => {
      loadingStore.hide();
      return response;
    },
    (error) => {
      loadingStore.hide();
      
      // Manejo de errores de validación (400)
      if (error.response?.status === 400) {
        const errorData = error.response.data;
        if (errorData && errorData.errors) {
          // Obtener el primer mensaje de error
          const firstErrorKey = Object.keys(errorData.errors)[0];
          const errorMessage = errorData.errors[firstErrorKey].message || 'Error de validación';
          
          // Mostrar toast con el mensaje de error
          console.error('Error de validación', errorMessage);
          return Promise.reject(error);
        }
      }
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.error('Sesión expirada', 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
        AuthService.logout();
        window.location.href = '/login';
      }
      
      return Promise.reject(error);
    }
  );
});

export default InterceptorAuth;