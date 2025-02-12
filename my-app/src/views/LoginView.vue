<template>
  <div class="auth-container">
    <h2 class="auth-title">Вход</h2>
    <form class="auth-form" @submit.prevent="handleLogin">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
    </form>
    <p>Нет аккаунта? <router-link to="/register">Регистрация</router-link></p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    ...mapActions("auth", ["loginUser"]),
    async handleLogin() {
      this.error = null;
      const success = await this.loginUser({
        email: this.email,
        password: this.password,
      });
      if (success) {
        this.$router.push("/");
      } else {
        this.error = "Ошибка авторизации. Проверьте данные.";
      }
    },
  },
};
</script>
