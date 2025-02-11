<template>
  <header class="header">
    <a href="/"><h1>Просто купить</h1></a>
    <nav>
      <router-link to="/">Каталог</router-link>
      <router-link v-if="isAuthenticated" to="/cart">Корзина</router-link>
      <router-link v-if="isAuthenticated" to="/orders">Заказы</router-link>
      <router-link v-if="!isAuthenticated" to="/cart">Войти</router-link>
      <router-link v-if="!isAuthenticated" to="/cart">Регистрация</router-link>
      <button v-if="isAuthenticated" @click="logout">Выйти</button>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>

<style scoped>
.header {
  background: #333;
  color: white;
  padding: 15px;
  text-align: center;
}
nav a,
button {
  color: white;
  margin: 0 15px;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  text-decoration: underline;
}
</style>
