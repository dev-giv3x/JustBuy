<template>
  <div class="auth-container">
    <h2 class="auth-title">Вход</h2>
    <form class="auth-form" @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
    </form>
    <p>Нет аккаунта? <router-link to="/register">Регистрация</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: null,
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("auth/loginUser", this.credentials);
        this.$router.push("/");
      } catch (error) {
        this.errorMessage = "Ошибка авторизации";
      }
    },
  },
};
</script>
