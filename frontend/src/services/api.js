import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
        'Content-Type': 'application/json'
    }
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        // Só adiciona o header se o token existir e for válido
        if (token && token.trim() !== '' && token.split('.').length === 3) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('logado');
            localStorage.removeItem('usuario');
            localStorage.removeItem('role');
            localStorage.removeItem('nome');


            if (!window.location.href.includes('/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;