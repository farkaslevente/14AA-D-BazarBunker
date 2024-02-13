import { defineStore } from "pinia";
import userservice from "../services/userservice";

export const useUserStore = defineStore('userstore',{
    state : ()=>({
        user: {
            name: '',
            token: '',
            id:null,
            role:null
        },
        status:{
            loggedIn:false,
            message:''
        }
    }),
    getters:{},
    actions:{
        login(data){
            return userservice.login(data)
                .then(resp =>{
                    this.status.loggedIn = true;
                    this.user = resp.data.data;
                    this.status.message = ''; //resp.data.message;
                    sessionStorage.setItem('user',JSON.stringify(this.user))
                })
                .catch(err =>{
                    this.status.loggedIn = false;
                    this.user =  {name: '', token: '', id:null, role:null }
                    this.status.message = err.data.data.error;
                    return Promise.reject(err.resposne);
                })
        },
        logout(){
            return userservice.logout(this.user.token)
                .then(()=>{
                    this.status.loggedIn = false;
                    this.user =  {name: '', token: '', id:null, role:null }
                    sessionStorage.removeItem('user');
                });
        }
    } 
});