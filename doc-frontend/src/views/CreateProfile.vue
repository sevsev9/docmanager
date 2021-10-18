<template>
  <div>
    <h1>Finish Profile Setup</h1>
    <b-form @submit="register">
      <label for="create-nickname-input">Choose Nickname:</label>
      <b-form-input
          type="password"
          v-model="oAuthCache.nickname"
          placeholder="Password"
          id="register-password-input"
      ></b-form-input>

      <repeat-password-input v-model="oAuthCache.password"></repeat-password-input>
    </b-form>
  </div>
</template>

<script>
import RepeatPasswordInput from "@/components/RepeatPasswordInput";
import router from "@/router";
export default {
  name: "CreateProfile",
  components: {RepeatPasswordInput},
  data: () => {
    return {
      oAuthCache: {}  //is "" if passwords are not valid
    }
  },
  methods: {
    register() {
      if (this.oAuthCache.password === "") {
        alert("Please choose a valid password");
      } else {
        this.$store.dispatch('register', {
          nickname: this.oAuthCache.nickname,
          email: this.oAuthCache.email,
          password: this.oAuthCache.password,
          router
        });
      }
    }
  },
  mounted() {
    this.oAuthCache = this.$store.getters.oAuthCache;
    this.oAuthCache.password = "";
  },
}
</script>

<style scoped>
div {
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
}

h1 {
  width: 100%;
  text-align: center;
}
</style>