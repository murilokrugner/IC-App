import axios from 'axios';

const api = axios.create({
   baseURL: 'http://192.168.2.104:3333/',
})

//201.33.248.208

export default api;