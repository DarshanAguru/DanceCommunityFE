import axios from 'axios';

const api = axios.create(
    {
        baseURL: 'http://localhost:9000',
        withCredentials: true,
        timeout: 30000
    }
)

export default api;