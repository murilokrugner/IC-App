import axios from 'axios';

const api = axios.create({
   baseURL: 'http://192.168.0.122:3333/',
   timeout: 20000,
})

//201.33.248.208

export default api;