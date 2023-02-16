import firebase from '../../firestore';
import {doc, getDoc } from "firebase/firestore";
const db = firebase.firestore();

export default {
  state: {
    categories: [],
    all_movie: [],
    vote: {}
  },
  mutations:{
    SET_categories(state, value) {
        state.categories = value;
    },
    SET_ALL_MOVIE(state, value) {
        state.all_movie = value
    },
    SET_VOTE_MOVIE(state, value) {
        state.vote = value;
    }
  },
  actions: {
    async getAllCategories(){
        const docRef = doc(db, "categories", "getAllCategories");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            throw Error('No such document!  ');
        }
    },
    getAllMovie(context){
        return new Promise((resolve, reject) => {
            db.collection('movie').get()
            .then((response) => {
                const result = response.docs.map(doc => doc.data())
                context.commit('SET_ALL_MOVIE', result)
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    voteMovie(context, payload){
        return new Promise((resolve, reject) => {
            db.collection('vote').add(payload)
            .then((response) => {
                context.commit("SET_VOTE_MOVIE", response)
                resolve(response)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
  },
  getters: {
    categories(state){
      return state.categories
    },
    all_movie(state){
      return state.all_movie
    },
    vote(state){
        return state.vote
      },
  },
};
