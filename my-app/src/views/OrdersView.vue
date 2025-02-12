<template>
  <div class="orders-container">
    <h2>Мои заказы</h2>
    <p v-if="orders.length === 0">Заказов нет</p>

    <div v-else>
      <table class="orders-table">
        <thead>
          <tr>
            <th>ID заказа</th>
            <th>Товары</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.products.join(", ") }}</td>
            <td>{{ order.order_price }} ₽</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("orders", { orders: (state) => state.orders || [] }),
  },
  methods: {
    ...mapActions("orders", ["fetchOrders"]),
  },
  created() {
    this.fetchOrders();
  },
};
</script>

<style scoped>
.orders-container {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.orders-table th,
.orders-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}
</style>
