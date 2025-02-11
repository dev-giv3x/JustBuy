export default {
  namespaced: true,
  state: {
    user: null,
    token: localStorage.getItem("token") || null,
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  actions: {
    async loginUser({ commit }, credentials) {
      try {
        const response = await fetch("http://lifestealer86.ru/api-shop/login", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (response.status === 200 && data.data?.user_token) {
          commit("SET_TOKEN", data.data.user_token);
          localStorage.setItem("user_token", data.data.user_token);
          return true;
        }

        throw new Error(data.error?.message || "Ошибка авторизации");
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
  },
};
