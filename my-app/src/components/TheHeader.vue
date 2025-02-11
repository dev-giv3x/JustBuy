<template>
  <header class="header">
    <a href="/" class="logo"><h1>Просто купить</h1></a>
    <nav class="nav-links">
      <router-link to="/">Каталог</router-link>
      <router-link v-if="isAuthenticated" to="/cart">Корзина</router-link>
      <router-link v-if="isAuthenticated" to="/orders">Заказы</router-link>
      <router-link v-if="!isAuthenticated" to="/login">Войти</router-link>
      <router-link v-if="!isAuthenticated" to="/register"
        >Регистрация</router-link
      >
      <button v-if="isAuthenticated" @click="logout">Выйти</button>
    </nav>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["isAuthenticated"]),
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>
