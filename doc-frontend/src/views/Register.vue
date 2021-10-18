<template>
  <div>
    <div>
      <h1>Register</h1>
      <b-form class="register" @submit="register">
        <hr style="background-color: #646464; height: 1px;">
        <b-form-group
            id="register-auth-info"
            label="Please enter a valid E-Mail and Password"
            description="We will not share this information with anyone else."
            style="text-align: left"
        >
          <label for="register-nick-input">Nickname: (optional)</label>
          <b-form-input
              id="register-nick-input"
              v-model="form.nickname"
              type="text"
              placeholder="Maxi1234"
          ></b-form-input>
          <br>
          <label for="register-email-input">E-Mail:</label>
          <b-form-input
              id="register-email-input"
              v-model="form.email"
              type="email"
              placeholder="max.mustermann@sample.com"
              required
          ></b-form-input>
          <br>

          <repeat-password-input v-model="form.password" optional></repeat-password-input>
        </b-form-group>

        <b-button variant="primary" type="submit" style="float: right">Sign Up</b-button>
        <b-button variant="danger" type="reset" style="float: left">Reset Form</b-button>
      </b-form>
    </div>
    <b-overlay v-if="loading" :opacity="0.5" :show="loading" rounded="sm"
               style="position: absolute; width: 100%; height: 100vh;"></b-overlay>
  </div>
</template>

<script>
import router from "@/router";
import RepeatPasswordInput from "@/components/RepeatPasswordInput";

export default {
  name: "Register",
  components: {RepeatPasswordInput},
  data: () => {
    return {
      form: {
        nickname: "",
        email: "",
        password: ""
      },
      loading: false
    }
  },
  methods: {
    register(e) {
      e.preventDefault();
      if (this.form.password === "") {
        alert("Please choose a valid password");
      } else {
        this.$store.dispatch('register', {
          nickname: this.form.nickname,
          email: this.form.email,
          password: this.form.password,
          router
        });
      }
    }
  }
}
</script>

<style scoped>
.register {
  width: 25%;
  margin: auto;
}
</style>