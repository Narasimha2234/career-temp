import axios from 'axios';
import { store } from '../store/store';

const BASE_URL=process.env.REACT_APP_BASE_API_URL

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.auth.idToken;
    config.params = config.params || {};
    config.params['auth'] = token;
    return config;
});

export default axiosInstance;
