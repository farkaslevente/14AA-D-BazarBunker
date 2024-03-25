import Axios from 'axios';

const instance = Axios.create({
    baseURL: process.env.REACT_APP_HOSTB8,
    timeout: 1000,
    headers:{
        'Content-Type' : 'application/json'
    }
});

export default instance;