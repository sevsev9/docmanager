<template>
  <div>
    <div>
      <h1>Register</h1>
      <b-form class="register" @submit="register" @reset="formReset">
        <hr style="background-color: #646464; height: 1px;">
        <b-form-group
            id="register-auth-info"
            label="Please enter a valid E-Mail and Password"
            description="We will not share this information with anyone else."
            style="text-align: left"
        >
          <label for="register-email-input">E-Mail:</label>
          <b-form-input
              id="register-email-input"
              v-model="form.email"
              type="email"
              placeholder="max.mustermann@sample.com"
          ></b-form-input>
          <br>
          <label for="register-password-input">Password:</label>
          <b-form-input
              type="password"
              v-model="form.password"
              placeholder="Password"
              id="register-password-input"
          ></b-form-input>
          <b-form-invalid-feedback :state="validatePassword">
            Your password must be at least 8 characters long and contain all of the following:
            <ul>
              <li>Capital and non-capital letters. AaBbCc...</li>
              <li>Numbers: 0123456789</li>
              <li>Special characters: #?!@$%^&*-</li>
            </ul>
          </b-form-invalid-feedback>
          <br>
          <label for="register-password-repeat">Repeat Password:</label>
          <b-form-input
              type="password"
              v-model="form.repeat_password"
              placeholder="Repeat Password"
              id="register-password-repeat"
          ></b-form-input>
          <b-form-invalid-feedback :state="validatePasswordsMatch">
            Passwords must match.
          </b-form-invalid-feedback>
          <br>
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
export default {
  name: "Register",
  data: () => {
    return {
      form: {
        fname: "",
        lname: "",
        email: "",
        password: "",
        repeat_password: ""
      },
      loading: false
    }
  },
  methods: {
    register(e) {
      e.preventDefault();
      this.loading = true;
      this.$store.dispatch('register', {
        fname: this.form.fname,
        lname: this.form.lname,
        email: this.form.email,
        password: this.form.password
      });
    },
    formReset(e) {
      console.log(e); //@Debug
    },
    testPassword() {
      return this.form.password.length > 8                // Length > 8
          && /[A-Z]/.test(this.form.password)             // Contains uppercase characters
          && /[a-z]/.test(this.form.password)             // Contains lowercase characters
          && /[0-9]/.test(this.form.password)             // Contains numbers
          && /[#?!@$%^&*-]/.test(this.form.password);     // Contains special characters
    },
    passwordsMatch() {
      return this.form.password === this.form.repeat_password  // Passwords Match
    }
  },
  computed: {
    validatePassword() {
      return this.testPassword();
    },
    validatePasswordsMatch() {
      return this.passwordsMatch();
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