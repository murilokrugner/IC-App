import axios from 'axios';

const api = axios.create({
    baseURL: 'http://knowledgesoftware.kinghost.net:21046/',
});

//201.33.248.208
// geny 10.0.3.2
//maquina 192.168.2.104
// android studio 10.0.2.2

export default api;
