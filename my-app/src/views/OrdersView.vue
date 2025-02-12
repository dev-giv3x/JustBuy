<template>
  <div>
    <h2>Ваши заказы</h2>
    <ul v-if="orders.length">
      <li v-for="order in orders" :key="order.id">
        Заказ #{{ order.id }} - {{ order.order_price }}₽
      </li>
    </ul>
    <p v-else>У вас пока нет заказов</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("orders", ["orders"]),
  },
  methods: {
    ...mapActions("orders", ["fetchOrders"]),
  },
  created() {
    this.fetchOrders();
  },
};
</script>
