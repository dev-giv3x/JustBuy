export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || null,
    user: null,
    isAuthenticated: !!localStorage.getItem("token"),
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
    },
    SET_USER(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  actions: {
    async loginUser({ commit }, credentials) {
      try {
        const response = await fetch("http://lifestealer86.ru/api-shop/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const data = await response.json();
        if (data.data.user_token) {
          commit("SET_TOKEN", data.data.user_token);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },
};
