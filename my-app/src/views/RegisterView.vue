<template>
  <div class="auth-container">
    <h2>Регистрация</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label>ФИО:</label>
        <input v-model="user.fio" required />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input v-model="user.email" type="email" required />
      </div>
      <div class="form-group">
        <label>Пароль:</label>
        <input v-model="user.password" type="password" required />
      </div>

      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import { registerUser } from "@/utils/api";

export default {
  data() {
    return {
      user: {
        fio: "",
        email: "",
        password: "",
      },
      errorMessage: "",
      validationErrors: {},
    };
  },
  methods: {
    async register() {
      this.errorMessage = "";
      this.validationErrors = {};

      try {
        const response = await registerUser(this.user);

        if (response.data?.user_token) {
          localStorage.setItem("auth_token", response.data.user_token);
          this.$router.push("/");
        }
      } catch (error) {
        return error;
      }
    },
  },
};
</script>
