import Axios from './dataservice.js'

const adservice = {
    getAllAds() {
        return Axios.get('ads')
            .then(resp => {
                return resp.data;
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
};

export default adservice;