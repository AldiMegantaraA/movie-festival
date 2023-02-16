import firebase from '../../firestore'
import "firebase/compat/database";
import 'firebase/compat/firestore';
import { doc, updateDoc } from "firebase/firestore"; 
import router from '@/routes';
const db = firebase.firestore();

export default {
  state: {
    data_movie: {}
  },
  mutations:{
    SET_DATA_MOVIE(state, value) {
        state.data_movie = value;
    }
  },
  actions: {
    addDataMovie(context, payload){
        return new Promise((resolve, reject) => {
            db.collection('movie').add(payload)
            .then((response) => {
                resolve(response)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    editDataMovie(context, payload){
        db.collection('movie').get()
        .then(async (response) => {
            response.docs.filter(async (item) => {
                if(item.data().id === payload.id) {
                    const movieDocRef = doc(db, "movie", item.id);
                    await updateDoc(movieDocRef, payload);
                    router.push('/admin')
                }
            })
        })
        .catch(() => {
            throw Error('Gagal edit movie')
        })
    },
  },
  getters: {
    movie(state){
      return state.data_movie
    }
  },
};
