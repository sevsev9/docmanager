<template>
  <b-form-group
      id="create-password"
      :label=" (optional) ? '(Optional) Please enter a valid Password' : 'Please enter a valid Password' "
      description="Passwords must match a certain criteria for your own security."
      style="text-align: left"
  >
    <label for="password-input">Password:</label>
    <b-form-input
        type="password"
        v-model="password"
        placeholder="Password"
        id="password-input"
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
    <label for="password-repeat">Repeat Password:</label>
    <b-form-input
        type="password"
        v-model="repeat_password"
        placeholder="Repeat Password"
        id="password-repeat"
        @input="checkCriteria"
    ></b-form-input>
    <b-form-invalid-feedback :state="validatePasswordsMatch">
      Passwords must match.
    </b-form-invalid-feedback>
</b-form-group>
</template>

<script>
export default {
  name: "RepeatPasswordInput",
  props: {
    optional: Boolean
  },
  data: () => {
    return {
      password: "",
      repeat_password: ""
    }
  },
  methods: {
    testPassword() {
      return this.password.length > 8                // Length > 8
          && /[A-Z]/.test(this.password)             // Contains uppercase characters
          && /[a-z]/.test(this.password)             // Contains lowercase characters
          && /[0-9]/.test(this.password)             // Contains numbers
          && /[#?!@$%^&*-]/.test(this.password);     // Contains special characters
    },
    passwordsMatch() {
      return this.password === this.repeat_password  // Passwords Match
    },
    checkCriteria() {
      if (this.testPassword() && this.passwordsMatch()) {
        this.$emit('input', this.password);
      } else {
        this.$emit('input', "");
      }
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

</style>