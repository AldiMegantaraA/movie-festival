import { createStore } from "vuex";
import { config } from "vuex-module-decorators";
import auth from "./modules/auth"
import admin from "./modules/admin"
import movie from "./modules/movie"

config.rawError = true;

const store = createStore({
  modules: {
    auth,
    admin,
    movie
  },
});

export default store;
