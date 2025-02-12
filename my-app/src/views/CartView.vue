<template>
  <div class="cart-container">
    <h2>Корзина</h2>
    <p v-if="cartItems.length === 0">Корзина пуста</p>

    <div v-else>
      <table class="cart-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Цена</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.price }} ₽</td>
            <td>
              <button @click="removeFromCart(item.id)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>

      <p class="cart-total">Общая сумма: {{ cartTotalPrice }} ₽</p>

      <button @click="placeOrder" class="order-btn">Оформить заказ</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState("cart", ["cartItems"]),
    ...mapGetters("cart", ["cartTotalPrice"]),
  },
  methods: {
    ...mapActions("cart", ["fetchCart", "removeFromCart"]),
    ...mapActions("orders", ["placeOrder"]),
  },
  created() {
    this.fetchCart();
  },
};
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.cart-table th,
.cart-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

.cart-total {
  font-size: 18px;
  font-weight: bold;
}

.order-btn {
  background: #ff7f50;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

.order-btn:hover {
  background: #ff6b3d;
}
</style>
