import { createRouter, createWebHistory } from "vue-router";
import Catalog from "@/views/CatalogView.vue";
import Register from "@/views/RegisterView.vue";
import Login from "@/views/LoginView.vue";
import Cart from "@/views/CartView.vue";
import Orders from "@/views/OrdersView.vue";

const routes = [
  { path: "/", component: Catalog },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/cart", component: Cart },
  { path: "/orders", component: Orders },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
