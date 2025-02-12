<template>
  <div>
    <h2>Корзина</h2>
    <ul v-if="cart.length">
      <li v-for="item in cart" :key="item.id">
        {{ item.name }} - {{ item.price }}₽
        <button @click="removeItem(item.id)">Удалить</button>
      </li>
    </ul>
    <p v-else>Корзина пуста</p>
    <p>Итого: {{ totalPrice }}₽</p>
    <button @click="placeOrder" :disabled="cart.length === 0">
      Оформить заказ
    </button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState("cart", ["cartItems"]),
    ...mapGetters("cart", ["cartTotalPrice"]),
    cart() {
      return this.cartItems;
    },
    totalPrice() {
      return this.cartTotalPrice;
    },
  },
  methods: {
    ...mapActions("cart", ["fetchCart", "removeFromCart"]),
    ...mapActions("orders", ["placeOrder"]),
    async removeItem(id) {
      await this.removeFromCart(id);
    },
  },
  created() {
    this.fetchCart();
  },
};
</script>
