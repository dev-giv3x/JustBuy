export default {
  namespaced: true,
  state: {
    cartItems: [],
    loading: false,
    error: null,
  },
  mutations: {
    SET_CART(state, cart) {
      state.cartItems = cart;
    },
    ADD_TO_CART(state, product) {
      const existingItem = state.cartItems.find(
        (item) => item.product_id === product.product_id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    REMOVE_FROM_CART(state, id) {
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },
    CLEAR_CART(state) {
      state.cartItems = [];
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchCart({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await fetch("http://lifestealer86.ru/api-shop/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        commit("SET_CART", data.data);
      } catch (error) {
        commit("SET_ERROR", "Ошибка загрузки корзины");
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async addToCart({ commit }, product) {
      try {
        const response = await fetch(
          `http://lifestealer86.ru/api-shop/cart/${product.id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Ошибка добавления в корзину");
        }

        commit("ADD_TO_CART", product);
      } catch (error) {
        commit("SET_ERROR", "Ошибка при добавлении товара");
      }
    },

    async removeFromCart({ commit }, id) {
      try {
        const response = await fetch(
          `http://lifestealer86.ru/api-shop/cart/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Ошибка удаления товара");
        }

        commit("REMOVE_FROM_CART", id);
      } catch (error) {
        commit("SET_ERROR", "Ошибка при удалении товара");
      }
    },
  },
  getters: {
    cartTotalPrice(state) {
      return state.cartItems.reduce((total, item) => total + item.price, 0);
    },
  },
};
