<template>
  <div class="login">
    <h1>Login</h1>
    <b-form class="login" @submit="login" @reset="formReset">
      <b-form-group
          id="input-group-mail"
          label="Email address:"
          label-for="email-input-1"
      >
        <b-form-input
            id="email-input-1"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <b-form-group
          id="input-group-password"
          label="Password:"
          label-for="password-input-1"
      >
        <b-form-input
            id="password-input-1"
            v-model="form.password"
            type="password"
            placeholder="Password"
        ></b-form-input>
      </b-form-group>
      <a href="/register">Don't have an account? Register here.</a><br><br>
      <b-button type="reset" variant="danger" style="float: left">Reset</b-button>
      <b-button type="submit" variant="primary" style="float: right">Log In</b-button>
    </b-form>
    <b-overlay v-if="loading" :show="loading"
               style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10;"></b-overlay>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => {
    return {
      form: {
        email: "",
        password: ""
      },
      loading: false
    }
  },
  methods: {
    login(e) {
      e.preventDefault();
      this.$store.dispatch('login', {
        email: this.form.email,
        password: this.form.password
      });
    },
    formReset(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>
.login {
  margin: auto;
  width: 50%;
}
</style>