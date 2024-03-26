import Axios from './dataservice.js';

export default {
    getAllAds() {
        return Axios.get('/ads')
            .then(resp => {
                return resp.data;
            })
            .catch(err => {
                return Promise.reject(err.response);
            })
    },

    insertAd(data,token){
        return Axios.post('/ad',data,{headers: {"Authorization": "Bearer " + token}})
            .then(resp =>{
                return resp.data;
            })
            .catch(err =>{
                return Promise.reject(err.response);
            })
    }
}