import Axios from './dataservice.js';

const userservice = {
    registerUser(data) {
        return Axios.post('/register', data)
            .then(resp => {
                return resp;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },

    login(data) {
        return Axios.post('/login', data)
            .then(resp => {
                return resp;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
};

export default userservice;
