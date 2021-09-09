<template>
  <div>
    <div class="center-container">
      <div class="login">
        <img src="./src/assets/logo.png" alt="Sample User Image">
        <h2>Login</h2>
        <hr>
        <form onsubmit="log_in">
          <b-form-input type="text" required v-model="login.key" class="login-input"></b-form-input>
          <b-form-input type="password" required v-model="login.auth" class="login-input"></b-form-input>
          <b-button variant="primary" type="submit">Log In</b-button>
        </form>
      </div>
      <div class="register">
        <form>
          <b-form-input type="text" required v-model="register.username" placeholder="Username"></b-form-input>
          <b-form-input type="mail" required v-model="register.email" placeholder="E-Mail"></b-form-input>
          <b-form-input type="password" required v-model="register.password" placeholder="Password"></b-form-input>
          <b-form-input type="password" required v-model="register.password_control"
                        placeholder="Repeat Password"></b-form-input>
          <b-form-input type="text" requiredv-model="register.nickname"
                        placeholder="Nickname (Optional)"></b-form-input>
          <b-button variant="primary" type="submit">Sign Up</b-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Authenticate",
  data: () => {
    return {
      login: {
        username: "",
        password: ""
      },
      register: {
        username: "",
        password: "",
        password_control: "",
        email: "",
        nickname: "",
        registration_date: ""
      }
    }
  },
  methods: {
    log_in(event) {
      event.preventDefault();
      this.$store.dispatch('login', this.login);
    },
    sign_up(event) {
      event.preventDefault();
      this.$store.dispatch('register', this.register);
    }
  }
}
</script>

<style scoped>

</style>