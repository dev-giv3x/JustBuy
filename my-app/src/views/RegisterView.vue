<template>
  <div class="auth-container">
    <h2>Регистрация</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label>ФИО:</label>
        <input v-model="user.fio" />
        <span v-if="validationErrors.fio" class="error">{{
          validationErrors.fio
        }}</span>
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input v-model="user.email" type="email" />
        <span v-if="validationErrors.email" class="error">{{
          validationErrors.email
        }}</span>
      </div>

      <div class="form-group">
        <label>Пароль:</label>
        <input v-model="user.password" type="password" />
        <span v-if="validationErrors.password" class="error">{{
          validationErrors.password
        }}</span>
      </div>

      <button type="submit">Зарегистрироваться</button>
    </form>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
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
        this.handleRegistrationError(error);
      }
    },
    handleRegistrationError(error) {
      if (error.message.includes(",")) {
        this.validationErrors = this.parseValidationErrors(error.message);
        this.errorMessage = "Пожалуйста, исправьте ошибки в форме";
      } else {
        this.errorMessage = error.message;
      }
    },
    parseValidationErrors(message) {
      const errors = {};
      message.split(", ").forEach((error) => {
        const [field, ...msg] = error.split(" ");
        errors[field] = msg.join(" ");
      });
      return errors;
    },
  },
};
</script>

<style scoped>
.error-message {
  color: #ff4444;
  margin-top: 1rem;
  padding: 0.5rem;
  border: 1px solid #ff4444;
  border-radius: 4px;
}
</style>
