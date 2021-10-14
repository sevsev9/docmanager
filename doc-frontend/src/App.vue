<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>

      <b-dropdown id="user-dropdown" :text="($store.getters.loggedIn) ? 'Hello ' + $store.getters.userName : 'Login'"
                  variant="primary" class="m-2" right>
        <div v-if="$store.getters.loggedIn">
          <b-dropdown-item href="/profile">Profile</b-dropdown-item>
          <b-dropdown-item href="/dashboard">Dashboard</b-dropdown-item>
          <b-dropdown-item @click="$store.dispatch('logout', $router)">Logout</b-dropdown-item>
        </div>
        <div v-else>
          <b-dropdown-item href="/login">Login</b-dropdown-item>
          <b-dropdown-item href="/register">Register</b-dropdown-item>
        </div>
      </b-dropdown>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  width: 100%;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#user-dropdown {
  right: 0;
  top: 15px;
  position: absolute;
}
</style>
