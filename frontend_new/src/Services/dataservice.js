import axios from 'axios';

const instance = axios.create({
    baseURL: process.REACT_APP_HOST202,
    headers:{
        'Content-Type' : 'application/json'
    }
});

export default instance;