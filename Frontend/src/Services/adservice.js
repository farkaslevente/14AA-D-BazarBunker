import Axios from './dataservice.js'

const adservice = {
    getAllAds() {
        return Axios.get('/ads')
            .then(resp => {
                return resp.data;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
    getCounties() {
        return Axios.get('/counties')
            .then(resp => {
                return resp.data;
            })
            .catch(err => {
                return Promise.reject(err);
            })
    },
    getSettlements() {
        return Axios.get('/settlements')
            .then(resp => {
                return resp.data;
            })
            .catch(err => {
                return Promise.reject(err);
            })
    },
};

export default adservice;