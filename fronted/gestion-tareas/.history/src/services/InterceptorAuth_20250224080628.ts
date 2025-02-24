import axios from 'axios';
import { AuthService } from './AuthService';
import { loadingStore } from './interceptorLoadingService';

const InterceptorAuth = {
  usuario: axios.create({
    baseURL: 'http://localhost:8700/api/usuario'
  }),
  summary: axios.create({
    baseURL: 'http://localhost:8700/api/summary/'
  }),
  tarea: axios.create({
    baseURL: 'http://localhost:8700/api/tarea/'
  })
};

Object.values(InterceptorAuth).forEach(api => {
  api.interceptors.request.use(
    (config) => {
      loadingStore.show();
      const token = AuthService.getToken()?.replace(/"/g, '');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      //console.log("se le agrego el token a la peticion: " + config.url+"  token "+config.headers.Authorization);
      return config;
    },
    (error) => {
      loadingStore.hide();
      Promise.reject(error)
    }
    
  );

  api.interceptors.response.use(
    (response) => {
      loadingStore.hide();
      return response;
    },
    (error) => {
      if (error.response?.status !== 200 && error.response?.status !== 201) {
        AuthService.logout();
        window.location.href = '/login';
        loadingStore.hide();
      }
      loadingStore.hide();
      return Promise.reject(error);
    }
  );
});

export default InterceptorAuth;
