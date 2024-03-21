import Axios from 'axios';

const instance = Axios.create({
    baseURL: process.REACT_APP_HOST202,
    headers:{
        'Content-Type' : 'application/json'
    }
});

export default instance;