import axios from 'axios';

const apiServices = axios.create({
   baseURL: 'https://viacep.com.br/ws/',
})

export default apiServices;