import axios from "axios";

let isRefreshing = false;
let failedRequests = [];

const refreshAccessToken = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };

  const refresh_token = localStorage.getItem('refresh_token');

  if (!refresh_token) {
    // Очистить токены и перенаправить на страницу входа
    localStorage.removeItem('access_token');
    window.location.href = '/auth';
    return;
  }

  try {
    const response = await axios.post('http://localhost:8000/token/refresh/', {
      refresh: refresh_token
    }, config);

    if (response.status === 200) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      failedRequests.forEach(request => request());
      failedRequests = [];
    } else {
      // Очистить токены и перенаправить на страницу входа
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/auth';
    }
  } catch (error) {
    // Очистить токены и перенаправить на страницу входа
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/auth';
  }

  isRefreshing = false;
};

axios.interceptors.response.use(
  resp => resp,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequests.push(token => {
            if (token instanceof Error) {
              reject(token);
            } else {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              resolve(axios(originalRequest));
            }
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        return axios(originalRequest);
      } catch (error) {
        throw error;
      }
    }

    return Promise.reject(error);
  }
);

