import axios from 'axios';

const apiServices = axios.create({
   baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/microrregioes/',
})

export default apiMicrorregiao;