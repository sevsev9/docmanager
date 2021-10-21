<template>
  <div>
    <h1>Profile</h1>
    <table>
      <tbody>
      <tr>
        <td><p>Nickname: </p></td>
        <td>
          <b-form-input type="text" :placeholder="$store.getters.userName" v-model="nickname"></b-form-input>
        </td>
        <td>
          <b-button class="centeredButton" variant="primary" @click="change('Nickname')" :disabled="validateNickname">Change Nickname</b-button>
        </td>
      </tr>
      <tr>
        <td><p>E-Mail: </p></td>
        <td>
          <b-form-input type="email" :placeholder="$store.getters.email" v-model="email"></b-form-input>
        </td>
        <td>
          <b-button class="centeredButton" variant="primary" @click="change('Email')" :disabled="validateEmail">Change E-Mail</b-button>
        </td>
      </tr>
      <tr>
        <td><p>Password: </p></td>
        <td>
          <b-form-input type="password" placeholder="Enter new Password" v-model="password"></b-form-input>
        </td>
        <td>
          <b-button class="centeredButton" variant="primary" @click="change('Password')" :disabled="validatePassword">Change Password</b-button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="confirm_screen" v-if="confirm_screen">
      <h2>Change {{ change_type }}</h2>
      <b-form-input type="password" placeholder="Confirm New Password"></b-form-input>
      <b-form-input type="password" placeholder="Current Password"></b-form-input>
      <b-button variant="danger" @click="confirm_change"> Confirm</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data: () => {
    return {
      nickname: "",
      email: "",
      password: "",
      confirm_screen: false,
      change_type: ""
    }
  },
  methods: {
    change(val) {
      this.change_type = val;
      this.confirm_screen = true;
    },
    confirm_change() {
//@Todo ask for password on every change
      if (this.change_type === 'Nickname') {

        //@Todo implement nickname change
      } else if (this.change_type === 'Email') {
        console.log(this.email);
        //@Todo implement email change
      } else if (this.change_type === 'Password') {
        console.log(this.password);
        //@Todo implement password change
        //@Todo ask to repeat password on change with the confirm with password screen
      }
    },
    testPassword() {
      return this.password.length > 8                // Length > 8
          && /[A-Z]/.test(this.password)             // Contains uppercase characters
          && /[a-z]/.test(this.password)             // Contains lowercase characters
          && /[0-9]/.test(this.password)             // Contains numbers
          && /[#?!@$%^&*-]/.test(this.password);     // Contains special characters
    }
  },
  computed: {
    validateEmail() {
      return !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email.toLowerCase())
    },
    validateNickname() {
      return this.nickname.length < 4;
    },
    validatePassword() {
      return !this.testPassword();
    }
  }
}
</script>

<style scoped>
p {
  margin-top: auto;
  margin-bottom: 0;
}

table {
  width: 60%;
  margin: auto;
}
</style>