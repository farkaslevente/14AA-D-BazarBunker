import Axios from './dataservice.js';

export default {
  registerUser(data) {
    return Axios.post('/register', data)
      .then(resp => {
        // console.log(resp);
        return resp;
      })
      .catch(err => {
        // console.log(err.response);
        return Promise.reject(err.response);
      })
  },
  login(data){
    return Axios.post('/login', data)
      .then(resp => {
        return resp;
      })
      .catch(err => {
        return Promise.reject(err.response);
      })
  },
  logout(token){
    return Axios.post('/logout', '', {headers: {"Authorization" : "Bearer "+token}})
      .then(resp => {
        return resp;
      })
      .catch(err => {
        return Promise.reject(err.response);
      })
  }

}