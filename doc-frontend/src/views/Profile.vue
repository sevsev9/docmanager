<template>
  <div>
    <h1>Profile</h1>
    <table>
      <tbody>
        <tr>
          <td><p>Nickname: </p></td>
          <td><b-form-input type="text" :placeholder="$store.getters.userName"></b-form-input></td>
          <td><b-button class="centeredButton" variant="primary" @click="change('nickname')">Change Nickname</b-button> </td>
        </tr>
      <tr>
        <td><p>E-Mail: </p></td>
        <td><b-form-input type="text" :placeholder="$store.getters.email"></b-form-input></td>
        <td><b-button class="centeredButton" variant="primary" @click="change('email')">Change E-Mail</b-button></td>
      </tr>
        <tr>
          <td><p>Password: </p></td>
          <td><b-form-input type="password" placeholder="Enter new Password"></b-form-input></td>
          <td><b-button class="centeredButton" variant="primary" @click="change('password')">Change E-Mail</b-button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Profile",
  methods: {
    change(val) {
      //@Todo ask for password on every change
      if (val === 'nickname') {
        console.log(val);
        //@Todo implement nickname change
      } else if (val === 'email') {
        console.log(val);
        //@Todo implement email change
      } else if (val === 'password') {
        console.log(val);
        //@Todo implement password change
        //@Todo ask to repeat password on change with the confirm with password screen
      }
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