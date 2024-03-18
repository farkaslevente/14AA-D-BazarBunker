import axios from 'axios';

const instance = axios.create({
    baseURL: process.REACT_APP_LOCAL,
    headers:{
        'Content-Type' : 'application/json'
    }
});

export default instance;