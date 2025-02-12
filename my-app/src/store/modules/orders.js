export default {
  namespaced: true,
  state: {
    orders: [],
    error: null,
  },
  mutations: {
    SET_ORDERS(state, orders) {
      state.orders = orders;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchOrders({ commit }) {
      try {
        const response = await fetch("http://lifestealer86.ru/api-shop/order", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        commit("SET_ORDERS", data.data);
      } catch (error) {
        commit("SET_ERROR", "Ошибка загрузки заказов");
      }
    },

    async placeOrder({ commit, dispatch }) {
      try {
        const response = await fetch("http://lifestealer86.ru/api-shop/order", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message || "Ошибка при оформлении заказа");
        }

        alert("Заказ оформлен успешно!");
        dispatch("cart/fetchCart", null, { root: true });
        dispatch("fetchOrders");
      } catch (error) {
        commit("SET_ERROR", "Ошибка при оформлении заказа");
      }
    },
  },
  getters: {
    allOrders(state) {
      return state.orders;
    },
  },
};
