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
    ...mapActions(["fetchProducts"]),
    ...mapActions("cart", ["addToCart"]),
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

.products {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.product-card {
  background: #fff5e1;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  max-width: 200px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.image-container {
  width: 100%;
  height: 150px;
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

.price {
  display: block;
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  color: #d35400;
}

button {
  background: #ff8a65;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #d35400;
}
</style>
