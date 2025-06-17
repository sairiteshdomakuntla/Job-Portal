import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000/jobs',
    baseURL: 'https://job-portal-crud.onrender.com/jobs',

});

export default api;
