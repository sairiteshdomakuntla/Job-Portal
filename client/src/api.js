import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/jobs',
});

export default api;
