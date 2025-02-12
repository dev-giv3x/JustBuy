export default {
  namespaced: true,
  state: {
    cartItems: [],
  },
  mutations: {
    SET_CART(state, items) {
      state.cartItems = items;
    },
    ADD_TO_CART(state, product) {
      state.cartItems.push(product);
    },
    REMOVE_FROM_CART(state, productId) {
      state.cartItems = state.cartItems.filter((item) => item.id !== productId);
    },
  },
  actions: {
    async fetchCart({ commit }) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://lifestealer86.ru/api-shop/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        commit("SET_CART", data.data);
      } catch (error) {
        console.error("Ошибка при получении корзины:", error);
      }
    },
    async addToCart({ commit }, product) {
      try {
        if (!product.id) {
          throw new Error("Нет product.id, передан некорректный объект товара");
        }

        const response = await fetch(
          `http://lifestealer86.ru/api-shop/cart/${product.id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Ошибка при добавлении в корзину: ${response.statusText}`
          );
        }

        commit("ADD_TO_CART", product);
        console.log("Товар добавлен в корзину:", product);
      } catch (error) {
        console.error("Ошибка при добавлении товара в корзину:", error);
      }
    },
    async removeFromCart({ dispatch }, itemId) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://lifestealer86.ru/api-shop/cart/${itemId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          dispatch("fetchCart");
        }
      } catch (error) {
        console.error("Ошибка при удалении товара:", error);
      }
    },
  },
  getters: {
    cartTotalPrice(state) {
      return state.cartItems.reduce((total, item) => total + item.price, 0);
    },
  },
};
