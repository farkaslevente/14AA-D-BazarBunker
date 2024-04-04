import Axios from 'axios';

const instance = Axios.create({
    //baseURL: 'http://10.0.22.14:9000',
    //baseURL: 'http://localhost:9000',
    //baseURL: process.env.REACT_APP_LOCAL,
    //baseURL: 'http://192.168.56.1:9000',
    //baseURL: 'http://10.0.12.17:9000',
    //baseURL: 'http://10.0.33.10:9000',
    baseURL: 'http://10.0.22.22:9000',
    timeout: 1000,
    headers:{
        'Content-Type' : 'application/json'
    }
});

export default instance;