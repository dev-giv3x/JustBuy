<template>
  <div class="catalog">
    <h1>Каталог товаров</h1>

    <div v-if="loading" class="loading-spinner"></div>

    <div v-else class="products">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="image-container">
          <img
            :src="'http://lifestealer86.ru/' + product.image"
            alt="Изображение товара"
          />
        </div>
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <span class="price">{{ product.price }} ₽</span>
        <button @click="addToCart(product)">Добавить в корзину</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters(["allProducts", "loading", "error"]),
    products() {
      return this.allProducts;
    },
  },
  methods: {
    ...mapActions(["fetchProducts", "addToCart"]),
  },
  async created() {
    await this.fetchProducts();
    this.loading = false;
  },
};
</script>

<style scoped>
.catalog {
  text-align: center;
  padding: 20px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.products {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.product-card {
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-container {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

h2 {
  font-size: 18px;
  margin: 10px 0;
}

p {
  font-size: 14px;
  color: gray;
  flex-grow: 1;
}

.price {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

button {
  padding: 10px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: auto;
}

button:hover {
  background: #2980b9;
}
</style>
