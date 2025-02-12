export default {
  namespaced: true,
  state: {
    orders: [],
  },
  mutations: {
    SET_ORDERS(state, orders) {
      state.orders = orders;
    },
  },
  actions: {
    async fetchOrders({ commit }) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://lifestealer86.ru/api-shop/order", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        commit("SET_ORDERS", data.data);
      } catch (error) {
        console.error("Ошибка при получении заказов:", error);
      }
    },
    async placeOrder({ dispatch }) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://lifestealer86.ru/api-shop/order", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          dispatch("fetchOrders");
          return true;
        }
      } catch (error) {
        console.error("Ошибка при оформлении заказа:", error);
      }
      return false;
    },
  },
};
