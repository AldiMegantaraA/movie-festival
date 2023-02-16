import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../../firebase';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

export default {
  state: {
    user: {
        loggedIn: false,
        data: null
      }
  },
  mutations:{
    SET_LOGGED_IN(state, value) {
        state.user.loggedIn = value;
    },
    SET_USER(state, data) {
        state.user.data = data;
    }
  },
  actions: {
    register(context, payload){
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, payload.email, payload.password)
            .then((response) => {
                context.commit('SET_USER', response.user)
                updateProfile(response.user, {displayName: `${payload?.name}@${payload?.role}`})
                resolve(response)
            })
            .catch((err) => {
                reject(err)
                throw new Error('Unable to register user')
            })
        })
    },

    logIn(context, { email, password }){
        return new Promise((resolve) => {
            signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                localStorage.setItem('accesToken', response.user.accessToken)
                localStorage.setItem('displayName', response.user.displayName)
                context.commit('SET_USER', response.user)
                resolve(response)
            })
            .catch(() => {
                throw new Error('login failed')
            })
        })
    },

    async logOut(context){
        await signOut(auth)
        localStorage.removeItem('displayName')
        localStorage.removeItem('accesToken')
        context.commit('SET_USER', null)
    },

    fetchUser(context ,user) {
        return new Promise((resolve, reject) => {
            context.commit("SET_LOGGED_IN", user !== null);
            if (user) {
            context.commit("SET_USER", {
                displayName: user.displayName,
                email: user.email,
            });
            resolve(user)
            } else {
            reject('no user logged in')
            context.commit("SET_USER", null);
            }
        });
    }
  },
  getters: {
    user(state){
      return state.user
    }
  },
};
