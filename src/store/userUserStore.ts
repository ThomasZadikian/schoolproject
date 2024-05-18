import { defineStore } from "pinia";
import type { User } from "@/core/models/userModel";


interface userState {
    user : User | null; 
}

export const useUserStore = defineStore('user', {
    state: (): userState => ({
        user: null
      }), 
    actions: {
        setUser(user: User){
            this.user = user; 
        }, 
        clearUser(){
            sessionStorage.clear(); 
            this.user = null; 
        },
        getUser() {
            return this.user; 
        }
    },
    persist: {
        storage: sessionStorage,
        paths: ['user']
      },
}); 