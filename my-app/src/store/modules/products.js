export default {
  state: {
    products: [],
    loading: false,
    error: null,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit("setLoading", true);
      try {
        const response = await fetch(
          "http://lifestealer86.ru/api-shop/products"
        );
        const data = await response.json();
        commit("setProducts", data.data);
      } catch (error) {
        commit("setError", "Не удалось загрузить товары");
      } finally {
        commit("setLoading", false);
      }
    },
  },
  getters: {
    allProducts: (state) => state.products,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
};
