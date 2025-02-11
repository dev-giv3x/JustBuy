import { createStore } from "vuex";
import products from "./modules/products";
import auth from "./modules/auth";

export default createStore({
  state: {
    isAuthenticated: false,
  },
  getters: {},
  mutations: {
    setAuth(state, status) {
      state.isAuthenticated = status;
    },
  },
  actions: {
    login({ commit }) {
      commit("setAuth", true);
    },
    logout({ commit }) {
      commit("setAuth", false);
    },
  },
  modules: {
    products,
    auth,
  },
});
