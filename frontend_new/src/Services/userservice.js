import axios from './dataservice.js';

export default {
  registerUser(data) {
    return axios.post('/register', data)
      .then(resp => {
        // console.log(resp);
        return resp;
      })
      .catch(err => {
        // console.log(err.response);
        return Promise.reject(err.response);
      })
  },
  
//   login(data){
//     return axios.post('/login', data)
//       .then(resp => {
//         return resp;
//       })
//       .catch(err => {
//         return Promise.reject(err.response);
//       })
//   },

//   logout(token){
//     return axios.post('/logout', '', {headers: {"Authorization" : "Bearer "+token}})
//       .then(resp => {
//         return resp;
//       })
//       .catch(err => {
//         return Promise.reject(err.response);
//       })
//   }

}