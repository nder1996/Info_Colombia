

axiosInstance.interceptors.request.use(
    (config) => {
      loadingStore.show();
      return config;
    },
    (error) => {
      loadingStore.hide();
      return Promise.reject(error);
    }
  );
  
  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      loadingStore.hide();
      return response;
    },
    (error) => {
      loadingStore.hide();
      return Promise.reject(error);
    }
  );
  